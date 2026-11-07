package service

import (
	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/model"
	"time"
)

func StartSePayExpiryCleanup() {
	go func() {
		sweep := func() {
			if err := model.ExpireSePayTopUps(time.Now().Unix()); err != nil {
				common.SysError(common.LogText("SePay pending order cleanup failed: %s", err.Error()))
			}
		}
		sweep()
		ticker := time.NewTicker(time.Minute)
		defer ticker.Stop()
		for range ticker.C {
			sweep()
		}
	}()
}
