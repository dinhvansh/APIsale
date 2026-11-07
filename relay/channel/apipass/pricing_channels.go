package apipass

// Published price tiers used by the local resale import, not a routing policy.
var ChatPriceChannels = map[string]string{
	"claude-fable-5":               "regular",
	"claude-fable-5-1":             "regular",
	"claude-haiku-5-5":             "regular",
	"claude-opus-4-8":              "regular",
	"claude-opus-5":                "regular",
	"claude-opus-5-5":              "regular",
	"claude-sonnet-5":              "regular",
	"gemini-3-pro-preview":         "regular",
	"google/gemini-4-argon":        "regular",
	"google/gemini-4-argon-openai": "regular",
	"gpt-5.6-luna":                 "regular",
	"gpt-5.6-sol":                  "regular",
	"gpt-5.6-terra":                "regular",
	"gpt-6-1-terra":                "regular",
	"gpt-6-astra":                  "regular",
	"gpt-6-luna":                   "regular",
	"gpt-6-sol":                    "regular",
	"grok-build/grok-4.5":          "regular",
	"grok-build/grok-4.6":          "regular",
	"grok-build/grok-4.7":          "regular",
	"openai/gpt-5.5":               "regular",
}
