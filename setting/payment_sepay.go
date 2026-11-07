package setting

import (
	"crypto/subtle"
	"encoding/json"
	"net/url"
	"regexp"
	"strconv"
	"strings"

	"github.com/QuantumNous/new-api/common"
)

const SePayConfigOption = "SePayConfigSecret"
const SePayOrderTTL int64 = 1800
const SePayMaxUSD int64 = 10000

type SePayConfig struct {
	Enabled       bool   `json:"enabled"`
	AccountNumber string `json:"account_number"`
	AccountName   string `json:"account_name"`
	VNDPerUSD     int64  `json:"vnd_per_usd"`
	WebhookSecret string `json:"webhook_secret,omitempty"`
}

func GetSePayConfig() SePayConfig {
	common.OptionMapRWMutex.RLock()
	raw := common.OptionMap[SePayConfigOption]
	common.OptionMapRWMutex.RUnlock()
	cfg := SePayConfig{VNDPerUSD: 26000}
	if raw != "" {
		if err := json.Unmarshal([]byte(raw), &cfg); err != nil {
			return SePayConfig{}
		}
	}
	return cfg
}

func (cfg SePayConfig) Valid() bool {
	return regexp.MustCompile(`^[0-9]{6,20}$`).MatchString(cfg.AccountNumber) &&
		len(strings.TrimSpace(cfg.AccountName)) > 0 && len(cfg.AccountName) <= 100 &&
		cfg.VNDPerUSD >= 1 && cfg.VNDPerUSD <= 1000000 && len(cfg.WebhookSecret) >= 32 && len(cfg.WebhookSecret) <= 256
}

func (cfg SePayConfig) Authenticate(header string) bool {
	return cfg.Valid() && subtle.ConstantTimeCompare([]byte(header), []byte("Apikey "+cfg.WebhookSecret)) == 1
}

// SePay bank transaction webhooks use Authorization: Apikey, unlike the
// separate SePay merchant checkout product's x-secret-key IPN protocol.
func (cfg SePayConfig) QRURL(code string, amount int64) string {
	q := url.Values{"acc": {cfg.AccountNumber}, "bank": {"MBBank"}, "amount": {strconv.FormatInt(amount, 10)}, "des": {code}, "template": {"qronly"}}
	return "https://vietqr.app/img?" + q.Encode()
}

var sePayCodePattern = regexp.MustCompile(`(?i)\bBSK[0-9A-F]{16}\b`)

func SePayOrderCode(content string) string {
	codes := sePayCodePattern.FindAllString(strings.ToUpper(content), -1)
	if len(codes) != 1 {
		return ""
	}
	return codes[0]
}
