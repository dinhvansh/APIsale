package controller

import (
	"encoding/json"
	"errors"
	"net/http"
	"strings"
	"time"
	_ "time/tzdata"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/model"
	"github.com/QuantumNous/new-api/setting"
	"github.com/gin-gonic/gin"
	"github.com/shopspring/decimal"
	"github.com/thanhpk/randstr"
	"gorm.io/gorm"
)

func sePayAvailable(cfg setting.SePayConfig) bool {
	return cfg.Enabled && cfg.Valid()
}

func GetSePayInfo(c *gin.Context) {
	cfg := setting.GetSePayConfig()
	common.ApiSuccess(c, gin.H{"enabled": sePayAvailable(cfg), "vnd_per_usd": cfg.VNDPerUSD, "min_usd": 1, "max_usd": setting.SePayMaxUSD})
}

func GetSePayConfig(c *gin.Context) {
	cfg := setting.GetSePayConfig()
	hasSecret := cfg.WebhookSecret != ""
	cfg.WebhookSecret = ""
	common.ApiSuccess(c, gin.H{"config": cfg, "secret_configured": hasSecret})
}

func SaveSePayConfig(c *gin.Context) {
	var cfg setting.SePayConfig
	if c.ShouldBindJSON(&cfg) != nil {
		common.ApiErrorT(c, "Invalid parameters")
		return
	}
	cfg.AccountNumber = strings.TrimSpace(cfg.AccountNumber)
	cfg.AccountName = strings.TrimSpace(cfg.AccountName)
	cfg.WebhookSecret = strings.TrimSpace(cfg.WebhookSecret)
	if cfg.WebhookSecret == "" {
		cfg.WebhookSecret = setting.GetSePayConfig().WebhookSecret
	}
	if !cfg.Valid() {
		common.ApiErrorT(c, "Invalid SePay configuration")
		return
	}
	raw, err := json.Marshal(cfg)
	if err == nil {
		err = model.UpdateOptionsBulk(map[string]string{setting.SePayConfigOption: string(raw)})
	}
	if err != nil {
		common.ApiErrorT(c, "Failed to save configuration")
		return
	}
	GetSePayConfig(c)
}

func RequestSePay(c *gin.Context) {
	cfg := setting.GetSePayConfig()
	if !sePayAvailable(cfg) {
		common.ApiErrorT(c, "MB Bank payments are not enabled")
		return
	}
	var req struct {
		AmountUSD int64 `json:"amount_usd"`
	}
	if c.ShouldBindJSON(&req) != nil || req.AmountUSD < 1 || req.AmountUSD > setting.SePayMaxUSD {
		common.ApiErrorT(c, "Invalid top-up amount")
		return
	}
	quota, err := common.WalletQuotaFromDecimalStrict(decimal.NewFromInt(req.AmountUSD).Mul(decimal.NewFromFloat(common.QuotaPerUnit)))
	if err != nil || quota <= 0 {
		common.ApiErrorT(c, "Invalid top-up amount")
		return
	}
	if err = model.ValidateTopUpQuotaCapacity(c.GetInt("id"), quota); err != nil {
		paymentError(c, err)
		return
	}
	// Both inputs are bounded; order.Money is an exact integer VND snapshot.
	order := model.TopUp{UserId: c.GetInt("id"), Amount: req.AmountUSD, Money: float64(req.AmountUSD * cfg.VNDPerUSD), TradeNo: "BSK" + strings.ToUpper(randstr.Hex(16)), PaymentMethod: model.PaymentMethodMBBank, PaymentProvider: model.PaymentProviderSePay, CreateTime: time.Now().Unix(), Status: common.TopUpStatusPending}
	if err = order.Insert(); err != nil {
		common.ApiErrorT(c, "Failed to create order")
		return
	}
	common.ApiSuccess(c, gin.H{"code": order.TradeNo, "amount_usd": order.Amount, "amount_vnd": int64(order.Money), "account_number": cfg.AccountNumber, "account_name": cfg.AccountName, "bank": "MB Bank", "qr_url": cfg.QRURL(order.TradeNo, int64(order.Money)), "expires_at": order.CreateTime + setting.SePayOrderTTL, "status": order.Status})
}

func GetSePayOrder(c *gin.Context) {
	var order model.TopUp
	// Deliberately indistinguishable missing/foreign orders; don't leak account data.
	if model.DB.Where("trade_no = ? AND user_id = ? AND payment_provider = ?", c.Param("code"), c.GetInt("id"), model.PaymentProviderSePay).First(&order).Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"success": false})
		return
	}
	status := order.Status
	if status == common.TopUpStatusPending && order.CreateTime+setting.SePayOrderTTL < time.Now().Unix() {
		status = common.TopUpStatusExpired
	}
	common.ApiSuccess(c, gin.H{"code": order.TradeNo, "status": status})
}

type sePayTransaction struct {
	ID              int64  `json:"id"`
	Gateway         string `json:"gateway"`
	AccountNumber   string `json:"accountNumber"`
	TransferType    string `json:"transferType"`
	TransferAmount  int64  `json:"transferAmount"`
	Content         string `json:"content"`
	TransactionDate string `json:"transactionDate"`
}

func SePayWebhook(c *gin.Context) {
	cfg := setting.GetSePayConfig()
	if !cfg.Authenticate(c.GetHeader("Authorization")) {
		c.JSON(http.StatusUnauthorized, gin.H{"success": false})
		return
	}
	if !sePayAvailable(cfg) {
		c.JSON(http.StatusServiceUnavailable, gin.H{"success": false})
		return
	}
	var event sePayTransaction
	if c.ShouldBindJSON(&event) != nil || event.ID <= 0 || event.TransferAmount <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"success": false})
		return
	}
	// Outgoing and unrelated transactions must never credit any account.
	if event.TransferType != "in" || event.AccountNumber != cfg.AccountNumber {
		c.JSON(http.StatusOK, gin.H{"success": true})
		return
	}
	gateway := strings.ToLower(strings.ReplaceAll(strings.TrimSpace(event.Gateway), " ", ""))
	if gateway != "mbbank" && gateway != "mb" {
		c.JSON(http.StatusOK, gin.H{"success": true})
		return
	}
	code := setting.SePayOrderCode(event.Content)
	if code == "" {
		c.JSON(http.StatusOK, gin.H{"success": true})
		return
	}
	zone, _ := time.LoadLocation("Asia/Ho_Chi_Minh")
	paidAt, err := time.ParseInLocation("2006-01-02 15:04:05", event.TransactionDate, zone)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"success": false})
		return
	}
	_, err = model.CompleteSePayTopUp(code, event.ID, event.TransferAmount, paidAt.Unix(), c.ClientIP())
	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.JSON(http.StatusOK, gin.H{"success": true})
		return
	}
	if err != nil {
		// No payload or authentication headers in logs.
		common.SysError(common.LogText("SePay settlement rejected transaction_id=%d order=%s error=%s", event.ID, code, err.Error()))
		c.JSON(http.StatusConflict, gin.H{"success": false})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true})
}
