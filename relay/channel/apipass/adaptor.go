package apipass

import (
	"fmt"
	"slices"
	"strings"

	"github.com/gin-gonic/gin"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/relay/channel/openai"
	relaycommon "github.com/QuantumNous/new-api/relay/common"
	"github.com/QuantumNous/new-api/relaykit/dto"
)

// Chat uses ApiPass's OpenAI-compatible endpoint. Media is handled by the
// ApiPass task plugin, including persistence, polling and refunds.
type Adaptor struct{ openai.Adaptor }

func (a *Adaptor) ConvertOpenAIRequest(c *gin.Context, info *relaycommon.RelayInfo, request *dto.GeneralOpenAIRequest) (any, error) {
	converted, err := a.Adaptor.ConvertOpenAIRequest(c, info, request)
	if err != nil {
		return nil, err
	}
	return validateChatPrice(info, converted)
}

func (a *Adaptor) ConvertClaudeRequest(c *gin.Context, info *relaycommon.RelayInfo, request *dto.ClaudeRequest) (any, error) {
	converted, err := a.Adaptor.ConvertClaudeRequest(c, info, request)
	if err != nil {
		return nil, err
	}
	return validateChatPrice(info, converted)
}

func (a *Adaptor) ConvertGeminiRequest(c *gin.Context, info *relaycommon.RelayInfo, request *dto.GeminiChatRequest) (any, error) {
	converted, err := a.Adaptor.ConvertGeminiRequest(c, info, request)
	if err != nil {
		return nil, err
	}
	return validateChatPrice(info, converted)
}

// Published sale-price availability is independent of upstream routing. Chat
// uses APIPass's default route; forcing the catalogue's pricing tier can select
// an unavailable provider even when the same model works on the default route.
func validateChatPrice(info *relaycommon.RelayInfo, converted any) (any, error) {
	if _, ok := ChatPriceChannels[info.UpstreamModelName]; !ok {
		return nil, fmt.Errorf("APIPass model has no published sale price")
	}
	return converted, nil
}

func (a *Adaptor) GetChannelName() string { return "BeeskyBase" }

func (a *Adaptor) GetModelList() []string {
	return append(slices.Clone(ChatModels), TaskModels...)
}

func (a *Adaptor) GetRequestURL(info *relaycommon.RelayInfo) (string, error) {
	if strings.TrimSuffix(info.RequestURLPath, "/") != "/v1/chat/completions" {
		return "", fmt.Errorf("APIPass supports chat completions here; use the APIPass task endpoints for media")
	}
	return strings.TrimRight(info.ChannelBaseUrl, "/") + "/v1/chat/completions", nil
}

// ParseCatalogue accepts both ApiPass's marketplace envelope and its
// OpenAI-shaped chat list. Unknown media requires an updated task schema;
// never advertise a model that the installed plugin cannot submit safely.
func ParseCatalogue(body []byte) ([]string, error) {
	var catalogue struct {
		Models []struct {
			Endpoints []struct {
				Name string `json:"name"`
				Type string `json:"task_type"`
			} `json:"endpoints"`
		} `json:"models"`
		Data []struct {
			ID string `json:"id"`
		} `json:"data"`
	}
	if err := common.Unmarshal(body, &catalogue); err != nil {
		return nil, fmt.Errorf("invalid APIPass model catalogue")
	}
	ids := make([]string, 0)
	for _, family := range catalogue.Models {
		for _, endpoint := range family.Endpoints {
			if endpoint.Type == "text-to-text" || slices.Contains(TaskModels, endpoint.Name) {
				ids = append(ids, endpoint.Name)
			}
		}
	}
	for _, item := range catalogue.Data {
		if item.ID != "" {
			ids = append(ids, item.ID)
		}
	}
	slices.Sort(ids)
	return slices.Compact(ids), nil
}
