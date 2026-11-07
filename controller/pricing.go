package controller

import (
	"maps"
	"slices"
	"strings"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/model"
	"github.com/QuantumNous/new-api/pkg/jsplugin"
	"github.com/QuantumNous/new-api/service"
	"github.com/QuantumNous/new-api/setting/ratio_setting"

	"github.com/gin-gonic/gin"
)

func filterPricingByUsableGroups(pricing []model.Pricing, usableGroup map[string]string) []model.Pricing {
	if len(pricing) == 0 {
		return pricing
	}
	if len(usableGroup) == 0 {
		return []model.Pricing{}
	}

	filtered := make([]model.Pricing, 0, len(pricing))
	for _, item := range pricing {
		if common.StringsContains(item.EnableGroup, "all") {
			filtered = append(filtered, item)
			continue
		}
		for _, group := range item.EnableGroup {
			if _, ok := usableGroup[group]; ok {
				filtered = append(filtered, item)
				break
			}
		}
	}
	return filtered
}

// Customer pricing uses the storefront identity. Never mutate the shared
// pricing cache: administration still needs the actual provider binding.
func storefrontPricing(pricing []model.Pricing) []model.Pricing {
	result := slices.Clone(pricing)
	for i := range result {
		item := &result[i]
		branded := strings.HasPrefix(item.ModelName, "beesky/")
		item.BillingPluginVariants = slices.Clone(item.BillingPluginVariants)
		for j := range item.BillingPluginVariants {
			variant := &item.BillingPluginVariants[j]
			if variant.PluginKey != "apipass" {
				continue
			}
			branded = true
			variant.PluginKey, variant.PluginName, variant.Icon = "beeskybase", "BeeskyBase", "text:BB"
			variant.BillingUsageSchema = jsplugin.CloneUsageSchema(variant.BillingUsageSchema)
			delete(variant.BillingUsageSchema, "credits")
			variant.BillingUsageExamples = jsplugin.CloneUsageExamples(variant.BillingUsageExamples)
			for k := range variant.BillingUsageExamples {
				delete(variant.BillingUsageExamples[k].Facts, "credits")
			}
		}
		if branded {
			item.BillingUsageSchema = jsplugin.CloneUsageSchema(item.BillingUsageSchema)
			delete(item.BillingUsageSchema, "credits")
			item.BillingUsageExamples = jsplugin.CloneUsageExamples(item.BillingUsageExamples)
			for k := range item.BillingUsageExamples {
				delete(item.BillingUsageExamples[k].Facts, "credits")
			}
		}
	}
	return result
}

func GetPricing(c *gin.Context) {
	pricing := model.GetPricing()
	userId, exists := c.Get("id")
	usableGroup := map[string]string{}
	groupRatio := map[string]float64{}
	maps.Copy(groupRatio, ratio_setting.GetGroupRatioCopy())
	var group string
	if exists {
		user, err := model.GetUserCache(userId.(int))
		if err == nil {
			group = user.Group
			for g := range groupRatio {
				ratio, ok := ratio_setting.GetGroupGroupRatio(group, g)
				if ok {
					groupRatio[g] = ratio
				}
			}
		}
	}

	usableGroup = service.GetUserUsableGroups(group)
	pricing = filterPricingByUsableGroups(pricing, usableGroup)
	pricing = storefrontPricing(pricing)
	// check groupRatio contains usableGroup
	for group := range ratio_setting.GetGroupRatioCopy() {
		if _, ok := usableGroup[group]; !ok {
			delete(groupRatio, group)
		}
	}

	c.JSON(200, gin.H{
		"success":            true,
		"data":               pricing,
		"vendors":            model.GetVendors(),
		"group_ratio":        groupRatio,
		"usable_group":       usableGroup,
		"supported_endpoint": model.GetSupportedEndpointMap(),
		"auto_groups":        service.GetUserAutoGroup(group),
		"pricing_version":    "a42d372ccf0b5dd13ecf71203521f9d2",
	})
}

func ResetModelRatio(c *gin.Context) {
	defaultStr := ratio_setting.DefaultModelRatio2JSONString()
	err := model.UpdateOption("ModelRatio", defaultStr)
	if err != nil {
		common.ApiError(c, err)
		return
	}
	err = ratio_setting.UpdateModelRatioByJSONString(defaultStr)
	if err != nil {
		common.ApiError(c, err)
		return
	}
	common.ApiSuccessT(c, "Model ratios reset", nil)
}
