package plugins_test

import (
	"github.com/QuantumNous/new-api/relaykit/dto"
	"github.com/gin-gonic/gin"
	"net/http/httptest"
	"testing"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/constant"
	"github.com/QuantumNous/new-api/pkg/jsplugin"
	builtinplugins "github.com/QuantumNous/new-api/plugins"
	"github.com/QuantumNous/new-api/relay/channel/apipass"
	relaycommon "github.com/QuantumNous/new-api/relay/common"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestAPIPassProvider(t *testing.T) {
	source, err := builtinplugins.Source("apipass")
	require.NoError(t, err)
	registry := jsplugin.NewRegistry()
	plugin, err := registry.RegisterFactory(source, jsplugin.Options{Key: "apipass"})
	require.NoError(t, err)
	call := func(hook string, args ...any) map[string]any {
		t.Helper()
		value, callErr := plugin.Engine.Call(t.Context(), hook, args...)
		require.NoError(t, callErr)
		encoded, encodeErr := common.Marshal(value)
		require.NoError(t, encodeErr)
		var result map[string]any
		require.NoError(t, common.Unmarshal(encoded, &result))
		return result
	}
	t.Run("branded cleanup alias decodes before channel model mapping", func(t *testing.T) {
		body := map[string]any{"model": "beesky/image-watermark-remove", "input": map[string]any{"image": "https://example.com/owned.png"}}
		value, callErr := plugin.Engine.CallPath(t.Context(), "native", []string{"createTask"}, map[string]any{"body": map[string]any{"kind": "json", "value": body}})
		require.NoError(t, callErr)
		encoded, encodeErr := common.Marshal(value)
		require.NoError(t, encodeErr)
		var result map[string]any
		require.NoError(t, common.Unmarshal(encoded, &result))
		assert.Equal(t, "beesky/image-watermark-remove", result["model"])
		assert.Equal(t, "image_to_image", result["action"])
		assert.Equal(t, "apipass/image-watermaker-remove", result["requestBody"].(map[string]any)["model"])
	})
	model := "google/nano-banana-2"
	body := map[string]any{"model": model, "input": map[string]any{"prompt": "A yellow bee", "resolution": "1K"}}
	driver := map[string]any{
		"model": model, "upstreamModel": model, "requestBody": body,
		"baseUrl": "https://api.apipass.dev", "apiKey": "provider-test-key", "authHeader": "provider-test-key",
	}

	t.Run("separate provider preserves OpenAI and lists media without legacy defaults", func(t *testing.T) {
		apiType, supported := common.ChannelType2APIType(constant.ChannelTypeAPIPass)
		require.True(t, supported)
		assert.Equal(t, constant.APITypeAPIPass, apiType)
		assert.Equal(t, "https://api.apipass.dev", constant.GetChannelBaseURL(constant.ChannelTypeAPIPass))
		openAIType, supported := common.ChannelType2APIType(constant.ChannelTypeOpenAI)
		require.True(t, supported)
		assert.Equal(t, constant.APITypeOpenAI, openAIType)
		adaptor := &apipass.Adaptor{}
		assert.Contains(t, adaptor.GetModelList(), model)
		assert.Contains(t, adaptor.GetModelList(), "suno/generate")
		assert.NotContains(t, adaptor.GetModelList(), "gpt-3.5-turbo")
		assert.Len(t, plugin.Meta.Models, len(apipass.TaskModels))
		url, requestErr := adaptor.GetRequestURL(&relaycommon.RelayInfo{RequestURLPath: "/v1/chat/completions", ChannelMeta: &relaycommon.ChannelMeta{ChannelBaseUrl: "https://api.apipass.dev/"}})
		require.NoError(t, requestErr)
		assert.Equal(t, "https://api.apipass.dev/v1/chat/completions", url)
		_, requestErr = adaptor.GetRequestURL(&relaycommon.RelayInfo{RequestURLPath: "/v1/responses"})
		require.Error(t, requestErr)
	})
	t.Run("chat conversion preserves default routing and rejects unpriced models", func(t *testing.T) {
		c, _ := gin.CreateTestContext(httptest.NewRecorder())
		info := &relaycommon.RelayInfo{OriginModelName: "claude-haiku-5-5", ChannelMeta: &relaycommon.ChannelMeta{ChannelType: constant.ChannelTypeAPIPass, UpstreamModelName: "claude-haiku-5-5"}}
		value, err := (&apipass.Adaptor{}).ConvertOpenAIRequest(c, info, &dto.GeneralOpenAIRequest{Model: "claude-haiku-5-5"})
		require.NoError(t, err)
		encoded, err := common.Marshal(value)
		require.NoError(t, err)
		var outgoing map[string]any
		require.NoError(t, common.Unmarshal(encoded, &outgoing))
		assert.Equal(t, "claude-haiku-5-5", outgoing["model"])
		assert.NotContains(t, outgoing, "channel")
		info.UpstreamModelName = "gpt-6-1-sol"
		_, err = (&apipass.Adaptor{}).ConvertOpenAIRequest(c, info, &dto.GeneralOpenAIRequest{Model: "gpt-6-1-sol"})
		require.ErrorContains(t, err, "no published sale price")
	})

	t.Run("catalogue parses provider endpoint names instead of marketplace UUIDs", func(t *testing.T) {
		ids, parseErr := apipass.ParseCatalogue([]byte(`{"models":[{"id":"marketplace-uuid","endpoints":[{"name":"google/nano-banana-2","task_type":"text-to-image"},{"name":"new-chat","task_type":"text-to-text"},{"name":"unknown-video","task_type":"text-to-video"},{"name":"twitter/graphql/create-tweet","task_type":"social-media-api"}]}]}`))
		require.NoError(t, parseErr)
		assert.Equal(t, []string{"google/nano-banana-2", "new-chat"}, ids)
		_, parseErr = apipass.ParseCatalogue([]byte(`not-json`))
		require.Error(t, parseErr)
	})
	t.Run("native create preserves false and zero and never sends client callbacks", func(t *testing.T) {
		value, callErr := plugin.Engine.CallPath(t.Context(), "native", []string{"createTask"}, map[string]any{
			"body": map[string]any{"kind": "json", "value": map[string]any{
				"model": "suno/generate", "input": map[string]any{"customMode": false, "instrumental": false, "audioWeight": 0}, "callBackUrl": "https://client.invalid/hook",
			}},
		})
		require.NoError(t, callErr)
		encoded, encodeErr := common.Marshal(value)
		require.NoError(t, encodeErr)
		assert.Contains(t, string(encoded), `"audioWeight":0`)
		assert.Contains(t, string(encoded), `"instrumental":false`)
		assert.NotContains(t, string(encoded), "client.invalid")
	})
	t.Run("submission targets the channel host and polling encodes upstream task ID", func(t *testing.T) {
		request := call("buildSubmitRequest", driver)
		assert.Equal(t, "https://api.apipass.dev/api/v1/jobs/createTask", request["url"])
		assert.Equal(t, "Bearer provider-test-key", request["headers"].(map[string]any)["Authorization"])
		submitted := call("parseSubmitResponse", driver, map[string]any{"statusCode": 200, "body": map[string]any{"code": 200, "data": map[string]any{"taskId": "private-task"}}})
		assert.Equal(t, "private-task", submitted["taskId"])
		query := call("buildQueryRequest", map[string]any{"baseUrl": "https://channel.example", "taskId": "id&other=value", "apiKey": "provider-test-key", "authHeader": "provider-test-key"})
		assert.Equal(t, "https://channel.example/api/v1/jobs/recordInfo?taskId=id%26other%3Dvalue", query["url"])
		assert.Equal(t, "Bearer provider-test-key", query["headers"].(map[string]any)["Authorization"])
	})
	t.Run("polling recognizes terminal failures and never treats unknown states as pending", func(t *testing.T) {
		for _, tc := range []struct{ provider, normalized string }{{"waiting", "SUBMITTED"}, {"queuing", "QUEUED"}, {"generating", "IN_PROGRESS"}, {"fail", "FAILURE"}, {"unexpected", "UNKNOWN"}} {
			result := call("parseTaskResult", map[string]any{}, map[string]any{"code": 200, "data": map[string]any{"state": tc.provider, "failMsg": "Provider rejected the task"}})
			assert.Equal(t, tc.normalized, result["status"])
		}
		_, callErr := plugin.Engine.Call(t.Context(), "parseTaskResult", map[string]any{}, map[string]any{"code": 200, "data": map[string]any{"state": "success", "resultJson": "broken-json"}})
		require.ErrorContains(t, callErr, "Invalid APIPass result JSON")
	})
	t.Run("image and Suno results expose artifacts without sending provider credentials to the CDN", func(t *testing.T) {
		for _, tc := range []struct{ action, result, kind string }{
			{"text_to_image", `{"resultUrls":["https://cdn.apipass.dev/image.png"]}`, "image"},
			{"text_to_music", `{"data":[{"audio_url":"https://cdn.apipass.dev/song.mp3"}]}`, "audio"},
			{"text_to_music", `{"sunoData":[{"audioUrl":"https://cdn.example/song.mp3"}]}`, "audio"},
			{"text_to_music", `{"vocalUrl":"https://cdn.example/vocal.mp3","instrumentalUrl":"https://cdn.example/music.mp3"}`, "audio"},
			{"text_to_music", `{"wavUrl":"https://cdn.example/music.wav"}`, "audio"},
		} {
			data := map[string]any{"code": 200, "data": map[string]any{"state": "success", "resultJson": tc.result}}
			value, callErr := plugin.Engine.Call(t.Context(), "listArtifacts", map[string]any{"status": "SUCCESS", "action": tc.action, "data": data})
			require.NoError(t, callErr)
			encoded, encodeErr := common.Marshal(value)
			require.NoError(t, encodeErr)
			assert.Contains(t, string(encoded), `"type":"`+tc.kind+`"`)
			request := call("buildContentRequest", map[string]any{"action": tc.action, "data": data, "artifactKey": "output-0", "apiKey": "provider-test-key", "clientRequest": map[string]any{"method": "GET"}})
			assert.Equal(t, true, request["credentialless"])
			assert.NotContains(t, request, "headers")
		}
	})
	t.Run("invalid quantities fail before a paid submission including schema-less catalogue entries", func(t *testing.T) {
		for _, input := range []map[string]any{
			{"prompt": "bee", "num_images": 129}, {"prompt": "bee", "n": -1},
			{"prompt": "bee", "duration": "-1"}, {"prompt": "bee", "duration": 3601},
			{"prompt": "bee", "advanced": map[string]any{"duration": -2}},
		} {
			_, callErr := plugin.Engine.Call(t.Context(), "buildSubmitRequest", map[string]any{"model": model, "baseUrl": "https://api.apipass.dev", "requestBody": map[string]any{"input": input}})
			require.Error(t, callErr)
		}
	})
	t.Run("continuations require host-resolved owned tasks and map to private IDs only upstream", func(t *testing.T) {
		ctx := map[string]any{"model": model, "baseUrl": "https://api.apipass.dev", "requestBody": map[string]any{"input": map[string]any{"taskId": "gateway-task", "prompt": "extend"}}}
		_, callErr := plugin.Engine.Call(t.Context(), "buildSubmitRequest", ctx)
		require.ErrorContains(t, callErr, "Referenced task")
		ctx["originTasks"] = []map[string]any{{"taskId": "gateway-task", "upstreamTaskId": "private-task"}}
		request := call("buildSubmitRequest", ctx)
		assert.Equal(t, "private-task", request["body"].(map[string]any)["input"].(map[string]any)["taskId"])
	})
	t.Run("published prices follow resolution, quantity, duration and audio without tier bypass", func(t *testing.T) {
		cases := []struct {
			model   string
			input   map[string]any
			credits float64
		}{
			{model, map[string]any{"prompt": "bee", "resolution": "4K", "n": 2}, 44},
			{"pixverse-v6-max/text-to-video", map[string]any{"prompt": "bee", "aspect_ratio": "16:9", "quality": "720p", "duration": 5, "generate_audio_switch": false}, 50.82},
			{"pixverse-v6-max/text-to-video", map[string]any{"prompt": "bee", "aspect_ratio": "16:9", "quality": "720p", "duration": 5, "generate_audio_switch": true}, 69.3},
		}
		for _, tc := range cases {
			facts := call("extractUsage", map[string]any{"model": tc.model, "requestBody": map[string]any{"input": tc.input}})
			assert.InDelta(t, tc.credits, facts["credits"], 0.0000001)
		}
		for _, body := range []map[string]any{
			{"input": map[string]any{"prompt": "bee", "resolution": "1K"}, "channel": "official"},
			{"input": map[string]any{"prompt": "bee", "resolution": "unknown"}},
			{"input": map[string]any{"prompt": "bee", "resolution": "1K", "n": 2, "num_images": 3}},
		} {
			_, err := plugin.Engine.Call(t.Context(), "extractUsage", map[string]any{"model": model, "requestBody": body})
			require.Error(t, err)
		}
		_, err := plugin.Engine.Call(t.Context(), "extractUsage", map[string]any{"model": "topaz/video-upscale", "requestBody": map[string]any{"input": map[string]any{"duration": 5}}})
		require.Error(t, err)
	})

	t.Run("music source must be one of the owned origin task tracks", func(t *testing.T) {
		input := map[string]any{"taskId": "gateway-song", "audioId": "track-owned", "continueAt": 30}
		ctx := map[string]any{"model": "suno/extend", "apiKey": "key", "baseUrl": "https://api.apipass.dev", "requestBody": map[string]any{"input": input}, "originTasks": []map[string]any{{"taskId": "gateway-song", "upstreamTaskId": "private-song", "data": map[string]any{"data": map[string]any{"resultJson": `{"sunoData":[{"id":"track-owned","audioUrl":"https://cdn.example/song.mp3"}]}`}}}}}
		request := call("buildSubmitRequest", ctx)
		outgoing := request["body"].(map[string]any)["input"].(map[string]any)
		assert.Equal(t, "track-owned", outgoing["audioId"])
		assert.NotContains(t, outgoing, "taskId")
		input["audioId"] = "foreign-track"
		_, err := plugin.Engine.Call(t.Context(), "buildSubmitRequest", ctx)
		require.ErrorContains(t, err, "Select a song")
	})
	t.Run("numeric documented Kling duration matches the published string duration rule", func(t *testing.T) {
		ctx := map[string]any{"model": "kling/kling-2-6", "requestBody": map[string]any{"input": map[string]any{"prompt": "cabin", "duration": 5, "generate_audio": false}}}
		facts := call("extractUsage", ctx)
		assert.EqualValues(t, 1, facts["jobs"])
		assert.NotEmpty(t, facts["rate"])
	})
	t.Run("usage reserves one job and submitted quantities without trusting undocumented costs", func(t *testing.T) {
		facts := call("extractUsage", driver)
		assert.EqualValues(t, 1, facts["jobs"])
		assert.EqualValues(t, 10, facts["credits"])
		settled := call("extractUsageOnComplete", map[string]any{}, map[string]any{"status": "SUCCESS"}, map[string]any{"cost": -100000000})
		assert.Equal(t, map[string]any{"jobs": float64(1)}, settled)
	})
}
