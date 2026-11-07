package controller

import (
	"errors"
	"fmt"
	"github.com/QuantumNous/new-api/constant"
	"github.com/QuantumNous/new-api/pkg/billingexpr"
	relayconstant "github.com/QuantumNous/new-api/relay/constant"
	"github.com/QuantumNous/new-api/relay/helper"
	"github.com/QuantumNous/new-api/service"
	"net/http"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/i18n"
	"github.com/QuantumNous/new-api/middleware"
	"github.com/QuantumNous/new-api/model"
	relaycommon "github.com/QuantumNous/new-api/relay/common"
	"github.com/QuantumNous/new-api/relaykit/types"

	"github.com/gin-gonic/gin"
)

func Playground(c *gin.Context) {
	var newAPIError *types.NewAPIError

	defer func() {
		if newAPIError != nil {
			c.JSON(newAPIError.StatusCode, gin.H{
				"error": newAPIError.ToOpenAIError(common.UpstreamAddresses(c)...),
			})
		}
	}()

	useAccessToken := c.GetBool("use_access_token")
	if useAccessToken {
		newAPIError = types.NewError(errors.New(i18n.T(c, i18n.MsgRelayAccessTokenUnsupported)), types.ErrorCodeAccessDenied, types.ErrOptionWithSkipRetry())
		return
	}

	relayInfo, err := relaycommon.GenRelayInfo(c, types.RelayFormatOpenAI, nil, nil)
	if err != nil {
		newAPIError = types.NewError(err, types.ErrorCodeInvalidRequest, types.ErrOptionWithSkipRetry())
		return
	}

	userId := c.GetInt("id")

	// Write user context to ensure acceptUnsetRatio is available
	userCache, err := model.GetUserCache(userId)
	if err != nil {
		newAPIError = types.NewError(err, types.ErrorCodeQueryDataError, types.ErrOptionWithSkipRetry())
		return
	}
	userCache.WriteContext(c)

	tempToken := &model.Token{
		UserId: userId,
		Name:   fmt.Sprintf("playground-%s", relayInfo.UsingGroup),
		Group:  relayInfo.UsingGroup,
	}
	_ = middleware.SetupContextForToken(c, tempToken)

	Relay(c, types.RelayFormatOpenAI)
}

// EstimatePlaygroundChat evaluates the sale expression without generating output.
func EstimatePlaygroundChat(c *gin.Context) {
	c.Header("Cache-Control", "private, no-store")
	if c.GetBool("use_access_token") {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}
	request, err := helper.GetAndValidateTextRequest(c, relayconstant.RelayModeChatCompletions)
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	// Reject remote media: the Studio only estimates text chat locally.
	for _, message := range request.Messages {
		if _, ok := message.Content.(string); !ok {
			c.AbortWithStatus(http.StatusBadRequest)
			return
		}
	}
	user, err := model.GetUserCache(c.GetInt("id"))
	if err != nil {
		c.AbortWithStatus(http.StatusServiceUnavailable)
		return
	}
	user.WriteContext(c)
	common.SetContextKey(c, constant.ContextKeyUsingGroup, user.Group)
	info := relaycommon.GenRelayInfoOpenAI(c, request)
	info.RelayMode = relayconstant.RelayModeChatCompletions
	tokens, err := service.CountRequestToken(c, request.GetTokenCountMeta(), info)
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	_, err = helper.ModelPriceHelper(c, info, tokens, request.GetTokenCountMeta())
	if err != nil || info.TieredBillingSnapshot == nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	output := request.MaxTokens
	if request.MaxCompletionTokens != nil {
		output = request.MaxCompletionTokens
	}
	if output == nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	snapshot := info.TieredBillingSnapshot
	input, err := helper.ResolveIncomingBillingExprRequestInput(c, info)
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	cost, _, err := billingexpr.RunExprWithRequest(snapshot.ExprString, billingexpr.TokenParams{P: float64(tokens), Len: float64(tokens), C: float64(*output)}, input)
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	quota, clamp := common.QuotaRoundChecked(cost / 1000000 * common.QuotaPerUnit * snapshot.GroupRatio)
	if clamp != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	c.JSON(http.StatusOK, gin.H{"quota": quota, "quota_per_usd": common.QuotaPerUnit, "input_tokens": tokens, "output_tokens": *output})
}
