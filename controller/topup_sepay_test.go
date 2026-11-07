package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"testing"
	"time"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/model"
	"github.com/QuantumNous/new-api/setting"
	"github.com/QuantumNous/new-api/setting/operation_setting"
	"github.com/gin-gonic/gin"
	"github.com/glebarez/sqlite"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"gorm.io/driver/mysql"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func TestSePayIntegration(t *testing.T) {
	for _, dialect := range []string{"sqlite", "mysql", "postgres"} {
		t.Run(dialect, func(t *testing.T) {
			var driver gorm.Dialector
			dbType := common.DatabaseTypeSQLite
			switch dialect {
			case "sqlite":
				driver = sqlite.Open(filepath.Join(t.TempDir(), "sepay.db") + "?_pragma=busy_timeout(5000)")
			case "mysql":
				dsn := os.Getenv("TEST_MYSQL_DSN")
				if dsn == "" {
					t.Skip("TEST_MYSQL_DSN required")
				}
				driver = mysql.Open(dsn)
				dbType = common.DatabaseTypeMySQL
			case "postgres":
				dsn := os.Getenv("TEST_POSTGRES_DSN")
				if dsn == "" {
					t.Skip("TEST_POSTGRES_DSN required")
				}
				driver = postgres.Open(dsn)
				dbType = common.DatabaseTypePostgreSQL
			}
			gin.SetMode(gin.TestMode)
			db, err := gorm.Open(driver, &gorm.Config{})
			require.NoError(t, err)
			sqlDB, err := db.DB()
			require.NoError(t, err)
			sqlDB.SetMaxOpenConns(4)
			oldDB, oldLogDB, oldType := model.DB, model.LOG_DB, common.MainDatabaseType()
			oldRedis, oldMemory, oldQuota := common.RedisEnabled, common.MemoryCacheEnabled, common.QuotaPerUnit
			previousCompliance := *operation_setting.GetPaymentSetting()
			common.OptionMapRWMutex.Lock()
			oldOptions := common.OptionMap
			common.OptionMap = map[string]string{}
			common.OptionMapRWMutex.Unlock()
			model.DB, model.LOG_DB = db, db
			common.SetMainDatabaseType(dbType)
			common.RedisEnabled, common.MemoryCacheEnabled, common.QuotaPerUnit = false, false, 500000
			operation_setting.GetPaymentSetting().ComplianceConfirmed = false
			operation_setting.GetPaymentSetting().ComplianceTermsVersion = operation_setting.CurrentComplianceTermsVersion
			t.Cleanup(func() {
				_ = db.Migrator().DropTable(&model.SePayReceipt{}, &model.TopUp{}, &model.User{}, &model.Option{}, &model.Log{})
				_ = sqlDB.Close()
				model.DB, model.LOG_DB = oldDB, oldLogDB
				common.SetMainDatabaseType(oldType)
				common.RedisEnabled, common.MemoryCacheEnabled, common.QuotaPerUnit = oldRedis, oldMemory, oldQuota
				*operation_setting.GetPaymentSetting() = previousCompliance
				common.OptionMapRWMutex.Lock()
				common.OptionMap = oldOptions
				common.OptionMapRWMutex.Unlock()
			})
			// Test both fresh creation and upgrade from the existing released tables.
			require.NoError(t, db.AutoMigrate(&model.User{}, &model.TopUp{}, &model.Option{}, &model.Log{}))
			require.NoError(t, db.Create(&model.User{Id: 42, Username: "sepay_test", Status: common.UserStatusEnabled, Quota: 0}).Error)
			legacy := model.TopUp{UserId: 42, Amount: 2, Money: 2, TradeNo: "legacy-order", PaymentProvider: "stripe", Status: common.TopUpStatusPending}
			require.NoError(t, db.Create(&legacy).Error)
			require.NoError(t, db.AutoMigrate(&model.SePayReceipt{}))
			require.NoError(t, db.AutoMigrate(&model.SePayReceipt{}))
			require.NotNil(t, model.GetTopUpByTradeNo("legacy-order"))
			cfg := setting.SePayConfig{Enabled: true, AccountNumber: "1234567890", AccountName: "TEST ACCOUNT", VNDPerUSD: 26000, WebhookSecret: strings.Repeat("s", 40)}
			setConfig := func(value setting.SePayConfig) {
				raw, e := json.Marshal(value)
				require.NoError(t, e)
				require.NoError(t, model.UpdateOptionsBulk(map[string]string{setting.SePayConfigOption: string(raw)}))
			}
			setConfig(cfg)
			request := func(handler gin.HandlerFunc, body, secret string, userID int, code string) *httptest.ResponseRecorder {
				recorder := httptest.NewRecorder()
				ctx, _ := gin.CreateTestContext(recorder)
				ctx.Request = httptest.NewRequest(http.MethodPost, "/", strings.NewReader(body))
				ctx.Request.Header.Set("Content-Type", "application/json")
				ctx.Request.Header.Set("Authorization", secret)
				ctx.Set("id", userID)
				ctx.Params = gin.Params{{Key: "code", Value: code}}
				handler(ctx)
				return recorder
			}
			makeOrder := func() string {
				rec := request(RequestSePay, `{"amount_usd":1}`, "", 42, "")
				require.Equal(t, 200, rec.Code)
				var body struct {
					Success bool `json:"success"`
					Data    struct {
						Code  string `json:"code"`
						Money int64  `json:"amount_vnd"`
						QR    string `json:"qr_url"`
					} `json:"data"`
				}
				require.NoError(t, json.Unmarshal(rec.Body.Bytes(), &body))
				require.True(t, body.Success, rec.Body.String())
				require.EqualValues(t, 26000, body.Data.Money)
				require.Contains(t, body.Data.QR, "amount=26000")
				require.Contains(t, body.Data.QR, "bank=MBBank")
				return body.Data.Code
			}
			zone, err := time.LoadLocation("Asia/Ho_Chi_Minh")
			require.NoError(t, err)
			payload := func(code string, id int64) map[string]any {
				return map[string]any{"id": id, "gateway": "MBBank", "accountNumber": cfg.AccountNumber, "transferType": "in", "transferAmount": 26000, "content": "NAP TIEN " + code, "transactionDate": time.Now().In(zone).Format("2006-01-02 15:04:05")}
			}
			send := func(event map[string]any, secret string) *httptest.ResponseRecorder {
				raw, e := json.Marshal(event)
				require.NoError(t, e)
				return request(SePayWebhook, string(raw), secret, 0, "")
			}
			balance := func() int {
				var user model.User
				require.NoError(t, db.Select("quota").First(&user, 42).Error)
				return user.Quota
			}
			auth := "Apikey " + cfg.WebhookSecret
			code := makeOrder()
			t.Run("invalid_or_unrelated_events_never_credit", func(t *testing.T) {
				cases := []struct {
					name, key string
					value     any
					status    int
				}{
					{"outgoing", "transferType", "out", 200}, {"foreign_account", "accountNumber", "999999999", 200}, {"foreign_bank", "gateway", "BIDV", 200},
					{"underpaid", "transferAmount", 25999, 409}, {"overpaid", "transferAmount", 26001, 409}, {"negative", "transferAmount", -1, 400}, {"fractional", "transferAmount", 26000.5, 400},
					{"unknown_order", "content", "BSKAAAAAAAAAAAAAAAA", 200}, {"ambiguous_memo", "content", code + " BSKAAAAAAAAAAAAAAAA", 200},
					{"late_transfer", "transactionDate", time.Now().Add(2 * time.Hour).In(zone).Format("2006-01-02 15:04:05"), 409},
				}
				for _, tc := range cases {
					t.Run(tc.name, func(t *testing.T) {
						e := payload(code, 101)
						e[tc.key] = tc.value
						rec := send(e, auth)
						assert.Equal(t, tc.status, rec.Code, rec.Body.String())
						assert.Zero(t, balance())
					})
				}
				assert.Equal(t, 401, send(payload(code, 101), "Apikey wrong-key").Code)
				assert.Zero(t, balance())
			})
			t.Run("owner_access_is_enforced", func(t *testing.T) {
				assert.Equal(t, 404, request(GetSePayOrder, "", "", 43, code).Code)
				assert.Equal(t, 200, request(GetSePayOrder, "", "", 42, code).Code)
			})
			t.Run("snapshot_and_duplicate_webhooks", func(t *testing.T) {
				modified := cfg
				modified.VNDPerUSD = 27000
				setConfig(modified)
				assert.Equal(t, 200, send(payload(code, 101), auth).Code)
				assert.Equal(t, 500000, balance())
				assert.Equal(t, 200, send(payload(code, 101), auth).Code)
				assert.Equal(t, 500000, balance())
				setConfig(cfg)
			})
			t.Run("transaction_id_cannot_pay_another_order", func(t *testing.T) {
				other := makeOrder()
				assert.Equal(t, 409, send(payload(other, 101), auth).Code)
				assert.Equal(t, 500000, balance())
			})
			t.Run("concurrent_retries_credit_once", func(t *testing.T) {
				other := makeOrder()
				e := payload(other, 102)
				raw, err := json.Marshal(e)
				require.NoError(t, err)
				var wg sync.WaitGroup
				results := make(chan int, 2)
				for range 2 {
					wg.Go(func() { results <- request(SePayWebhook, string(raw), auth, 0, "").Code })
				}
				wg.Wait()
				close(results)
				for status := range results {
					assert.Contains(t, []int{200, 409}, status)
				}
				assert.Equal(t, 200, send(e, auth).Code)
				assert.Equal(t, 1000000, balance())
			})
			t.Run("expiration_and_delayed_on_time_delivery", func(t *testing.T) {
				other := makeOrder()
				order := model.GetTopUpByTradeNo(other)
				require.NoError(t, db.Model(&model.TopUp{}).Where("id = ?", order.Id).Update("create_time", time.Now().Unix()-1900).Error)
				require.NoError(t, model.ExpireSePayTopUps(time.Now().Unix()))
				assert.Equal(t, common.TopUpStatusExpired, model.GetTopUpByTradeNo(other).Status)
				e := payload(other, 103)
				assert.Equal(t, 409, send(e, auth).Code)
				e["transactionDate"] = time.Now().Add(-200 * time.Second).In(zone).Format("2006-01-02 15:04:05")
				assert.Equal(t, 200, send(e, auth).Code)
				assert.Equal(t, 1500000, balance())
			})
			t.Run("wallet_ceiling_rolls_back_receipt_and_order", func(t *testing.T) {
				other := makeOrder()
				require.NoError(t, db.Model(&model.User{}).Where("id = ?", 42).Update("quota", common.MaxWalletQuota-10).Error)
				assert.Equal(t, 409, send(payload(other, 104), auth).Code)
				assert.Equal(t, common.TopUpStatusPending, model.GetTopUpByTradeNo(other).Status)
				var count int64
				require.NoError(t, db.Model(&model.SePayReceipt{}).Where("transaction_id = ?", 104).Count(&count).Error)
				assert.Zero(t, count)
			})
			t.Run("reject_invalid_amounts", func(t *testing.T) {
				for _, amount := range []string{"0", "-1", "1.5", "10001", "9223372036854775807"} {
					rec := request(RequestSePay, fmt.Sprintf(`{"amount_usd":%s}`, amount), "", 42, "")
					assert.Contains(t, rec.Body.String(), `"success":false`)
				}
			})
			t.Run("secret_not_returned_to_admin", func(t *testing.T) {
				rec := request(GetSePayConfig, "", "", 1, "")
				assert.NotContains(t, rec.Body.String(), cfg.WebhookSecret)
				assert.Contains(t, rec.Body.String(), `"secret_configured":true`)
			})
			var version string
			versionQuery := "SELECT version()"
			if dialect == "sqlite" {
				versionQuery = "SELECT sqlite_version()"
			}
			require.NoError(t, db.Raw(versionQuery).Scan(&version).Error)
			t.Logf("verified SePay migration, deduplication and settlement on %s: %s", dialect, version)
		})
	}
}
