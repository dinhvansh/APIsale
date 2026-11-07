package controller

import (
	"net/http"
	"strings"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/constant"
	"github.com/QuantumNous/new-api/middleware"
	"github.com/QuantumNous/new-api/model"
	pluginruntime "github.com/QuantumNous/new-api/pkg/jsplugin"
	"github.com/QuantumNous/new-api/relay"
	relaycommon "github.com/QuantumNous/new-api/relay/common"
	"github.com/QuantumNous/new-api/relaykit/types"
	"github.com/gin-gonic/gin"
)

// PlaygroundTaskContext uses the signed-in user's wallet, just like Playground.
// No persistent API credential is created or returned to the browser.
func PlaygroundTaskContext(c *gin.Context) {
	if c.GetBool("use_access_token") {
		c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": gin.H{"message": "A dashboard login session is required"}})
		return
	}
	user, err := model.GetUserCache(c.GetInt("id"))
	if err != nil {
		c.AbortWithStatus(http.StatusServiceUnavailable)
		return
	}
	user.WriteContext(c)
	common.SetContextKey(c, constant.ContextKeyUsingGroup, user.Group)
	if err := middleware.SetupContextForToken(c, &model.Token{UserId: user.Id, Name: "playground", Group: user.Group}); err != nil {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}
	PinStudioTaskRoute(c)
}

// PinStudioTaskRoute selects the media decoder without changing authentication.
// API callers retain their existing token limits and wallet context.
func PinStudioTaskRoute(c *gin.Context) {
	// This Studio catalogue currently uses this installed task driver. Its own
	// model, channel, quantity and price validation still runs before reservation.
	generation := pluginruntime.DefaultRegistry.Generation()
	plugin, ok := generation.Get("apipass")
	if !ok {
		c.AbortWithStatus(http.StatusServiceUnavailable)
		return
	}
	for _, route := range plugin.Meta.Routes {
		if route.Method == http.MethodPost && route.Decode == "createTask" {
			// Keep the native decoder's ownership checks and canonical action, and
			// use the host's neutral task response instead of the vendor envelope.
			route.Render = ""
			c.Set(pluginruntime.ContextKeyPinnedRoute, pluginruntime.PinnedRoute{Generation: generation, Plugin: plugin, Route: route})
			c.Next()
			return
		}
	}
	c.AbortWithStatus(http.StatusServiceUnavailable)
}

// GetPlaygroundTaskResult exposes a narrow, owner-only result projection.
// In particular neither the vendor response nor its task IDs are returned.
func GetPlaygroundTaskResult(c *gin.Context) {
	task, exists, err := model.GetByTaskId(c.GetInt("id"), c.Param("key"))
	if err != nil {
		c.AbortWithStatus(http.StatusServiceUnavailable)
		return
	}
	if !exists || task == nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}
	c.Header("Cache-Control", "private, no-store")
	text := ""
	tracks := []playgroundTrack{}
	if task.Status == model.TaskStatusSuccess {
		var body map[string]any
		if common.Unmarshal(task.Data, &body) == nil {
			data, _ := body["data"].(map[string]any)
			value := data["result"]
			if value == nil {
				value = data["resultJson"]
			}
			if encoded, ok := value.(string); ok {
				var decoded any
				if common.UnmarshalJsonStr(encoded, &decoded) == nil {
					value = decoded
				} else {
					text = encoded
				}
			}
			text = playgroundResultText(value, text, 0)
			tracks = playgroundResultTracks(value, 0)
		}
	}
	c.JSON(http.StatusOK, gin.H{"task_id": task.TaskID, "status": task.Status, "progress": task.Progress, "created_at": task.SubmitTime, "finished_at": task.FinishTime, "quota": task.Quota, "text": text, "tracks": tracks})
}

func playgroundResultText(value any, fallback string, depth int) string {
	if depth > 5 {
		return fallback
	}
	switch v := value.(type) {
	case string:
		if !strings.HasPrefix(v, "http") {
			return v
		}
	case []any:
		parts := make([]string, 0, len(v))
		for _, item := range v {
			if s := playgroundResultText(item, "", depth+1); s != "" {
				parts = append(parts, s)
			}
		}
		return strings.Join(parts, "\n\n")
	case map[string]any:
		for _, key := range []string{"lyrics", "text", "content"} {
			if s, ok := v[key].(string); ok && s != "" {
				return s
			}
		}
		for _, key := range []string{"data", "lyricsData", "sunoData", "result"} {
			if s := playgroundResultText(v[key], "", depth+1); s != "" {
				return s
			}
		}
	}
	return fallback
}

// Only track IDs and titles cross this boundary, never the upstream snapshot.
type playgroundTrack struct {
	ID    string `json:"id"`
	Title string `json:"title"`
}

func playgroundResultTracks(value any, depth int) []playgroundTrack {
	out := []playgroundTrack{}
	if depth > 6 {
		return out
	}
	switch v := value.(type) {
	case []any:
		for _, item := range v {
			out = append(out, playgroundResultTracks(item, depth+1)...)
		}
	case map[string]any:
		audio, _ := v["audio_url"].(string)
		if audio == "" {
			audio, _ = v["audioUrl"].(string)
		}
		id, _ := v["id"].(string)
		if id == "" {
			id, _ = v["audioId"].(string)
		}
		if id == "" {
			id, _ = v["audio_id"].(string)
		}
		if audio != "" && id != "" {
			title, _ := v["title"].(string)
			out = append(out, playgroundTrack{ID: id, Title: title})
		}
		for _, key := range []string{"data", "sunoData", "tracks", "items", "result"} {
			out = append(out, playgroundResultTracks(v[key], depth+1)...)
		}
	}
	return out
}

// EstimatePlaygroundTask never creates a task or a billing session.
func EstimatePlaygroundTask(c *gin.Context) {
	c.Header("Cache-Control", "private, no-store")
	info, err := relaycommon.GenRelayInfo(c, types.RelayFormatTask, nil, nil)
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	info.Action = c.GetString("task_action")
	if taskErr := relay.ResolveOriginTask(c, info); taskErr != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	if taskErr := relay.ApplyOriginTaskAffinity(c, info); taskErr != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	result, taskErr := relay.EstimateTaskSubmit(c, info)
	if taskErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": gin.H{"message": "Unable to estimate this request. Check the required parameters."}})
		return
	}
	c.JSON(http.StatusOK, gin.H{"quota": result.Quota, "quota_per_usd": common.QuotaPerUnit})
}
