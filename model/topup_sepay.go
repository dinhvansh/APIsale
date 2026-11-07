package model

import (
	"errors"
	"fmt"
	"time"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/logger"
	"github.com/QuantumNous/new-api/setting"
	"github.com/shopspring/decimal"
	"gorm.io/gorm"
)

const PaymentProviderSePay = "sepay"
const PaymentMethodMBBank = "mbbank"

// One bank transaction can settle at most one order, even across instances.
// Receipt and wallet updates commit together; failed settlement leaves no receipt.
type SePayReceipt struct {
	TransactionID int64  `gorm:"primaryKey;autoIncrement:false"`
	TradeNo       string `gorm:"size:255;uniqueIndex"`
	AmountVND     int64
	ReceivedAt    int64
}

var ErrSePayMismatch = errors.New("bank transaction does not match the payment order")
var ErrSePayExpired = errors.New("payment order has expired")

func CompleteSePayTopUp(code string, transactionID, amountVND, paidAt int64, callerIP string) (bool, error) {
	if transactionID <= 0 || amountVND <= 0 {
		return false, ErrSePayMismatch
	}
	var order TopUp
	credited := 0
	duplicate := false
	err := DB.Transaction(func(tx *gorm.DB) error {
		if err := lockForUpdate(tx).Where("trade_no = ?", code).First(&order).Error; err != nil {
			return err
		}
		if order.PaymentProvider != PaymentProviderSePay || order.PaymentMethod != PaymentMethodMBBank {
			return ErrPaymentMethodMismatch
		}
		if !decimal.NewFromFloat(order.Money).Equal(decimal.NewFromInt(amountVND)) {
			return ErrSePayMismatch
		}
		if order.Status == common.TopUpStatusSuccess {
			var receipt SePayReceipt
			if err := tx.Where("transaction_id = ? AND trade_no = ?", transactionID, code).First(&receipt).Error; err != nil {
				return ErrSePayMismatch
			}
			duplicate = true
			return nil
		}
		if order.Status != common.TopUpStatusPending && order.Status != common.TopUpStatusExpired {
			return ErrTopUpStatusInvalid
		}
		// Use the bank transaction time, so delayed SePay delivery can still settle
		// an on-time payment after the QR expires. Never accept a future-dated event.
		if paidAt < order.CreateTime-120 || paidAt > order.CreateTime+setting.SePayOrderTTL || paidAt > time.Now().Unix()+120 {
			return ErrSePayExpired
		}
		var err error
		credited, err = common.WalletQuotaFromDecimalStrict(decimal.NewFromInt(order.Amount).Mul(decimal.NewFromFloat(common.QuotaPerUnit)))
		if err != nil || credited <= 0 {
			return ErrInvalidTopUpQuota
		}
		receipt := SePayReceipt{TransactionID: transactionID, TradeNo: code, AmountVND: amountVND, ReceivedAt: time.Now().Unix()}
		if err := tx.Create(&receipt).Error; err != nil {
			return err
		}
		// The conditional claim also prevents double credit on SQLite, which has no
		// SELECT FOR UPDATE. A busy transaction is retried by SePay, never acknowledged.
		result := tx.Model(&TopUp{}).Where("id = ? AND status = ?", order.Id, order.Status).Updates(map[string]any{"status": common.TopUpStatusSuccess, "complete_time": time.Now().Unix()})
		if result.Error != nil {
			return result.Error
		}
		if result.RowsAffected != 1 {
			return ErrTopUpStatusInvalid
		}
		return creditTopUpQuota(tx, order.UserId, credited, nil)
	})
	if err != nil || duplicate {
		return duplicate, err
	}
	syncCreditUserQuotaCache(order.UserId, credited, "SePay top-up")
	RecordTopupLog(order.UserId, common.NewMessage("{{provider}} top-up succeeded, amount added: {{quota}}, payment amount: {{amount}}", map[string]any{"provider": "MB Bank / SePay", "quota": logger.FormatQuota(credited), "amount": fmt.Sprintf("%d VND", amountVND)}), callerIP, PaymentMethodMBBank, PaymentProviderSePay)
	return false, nil
}

// Expiration only hides stale payment requests. A delayed, authenticated event
// whose bank timestamp is within the original window can still settle it.
func ExpireSePayTopUps(now int64) error {
	return DB.Model(&TopUp{}).Where("payment_provider = ? AND status = ? AND create_time < ?", PaymentProviderSePay, common.TopUpStatusPending, now-setting.SePayOrderTTL).Update("status", common.TopUpStatusExpired).Error
}
