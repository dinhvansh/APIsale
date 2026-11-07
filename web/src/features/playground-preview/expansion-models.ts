import type { LiveModel } from './live-catalog'

// Only endpoints with completed real generation tests are listed.
export const expansionModels: LiveModel[] = [
  {
    id: 'kling-4.0/reference-to-video',
    name: 'Kling 4.0 Reference',
    category: 'video',
    icon: 'Kling.Color',
    actions: [
      {
        id: 'verified-reference-to-video',
        name: 'Create video',
        endpoint: 'kling-4.0/reference-to-video',
        fields: [
          {
            key: 'prompt',
            label: 'Creative brief',
            required: true,
            kind: 'textarea',
            maxLength: 3000,
          },
          {
            key: 'image_urls',
            label: 'Public image links (one per line)',
            required: true,
            kind: 'urls',
          },
        ],
        defaults: {
          duration: 5,
          resolution: '720p',
          aspect_ratio: '16:9',
          keep_original_sound: false,
        },
      },
    ],
  },
  {
    id: 'kling-4.0/keyframe-to-video',
    name: 'Kling 4.0 Keyframe',
    category: 'video',
    icon: 'Kling.Color',
    actions: [
      {
        id: 'verified-keyframe-to-video',
        name: 'Create video',
        endpoint: 'kling-4.0/keyframe-to-video',
        fields: [
          {
            key: 'prompt',
            label: 'Creative brief',
            required: true,
            kind: 'textarea',
            maxLength: 3000,
          },
          {
            key: 'last_frame_url',
            label: 'Last frame image link',
            required: true,
            kind: 'url',
          },
          {
            key: 'first_frame_url',
            label: 'First frame image link',
            required: true,
            kind: 'url',
          },
        ],
        defaults: {
          duration: 5,
          resolution: '720p',
          aspect_ratio: '16:9',
        },
      },
    ],
  },
  {
    id: 'flux-3-max/keyframes-to-video',
    name: 'Flux 3 Max Keyframes',
    category: 'video',
    icon: 'Flux',
    actions: [
      {
        id: 'verified-keyframes-to-video',
        name: 'Create video',
        endpoint: 'flux-3-max/keyframes-to-video',
        fields: [
          {
            key: 'prompt',
            label: 'Creative brief',
            required: true,
            kind: 'textarea',
            maxLength: 3000,
          },
          {
            key: 'keyframe_0',
            label: 'First frame image link',
            kind: 'url',
            required: true,
          },
          {
            key: 'keyframe_1',
            label: 'Last frame image link',
            kind: 'url',
            required: true,
          },
        ],
        defaults: {
          sound: true,
          duration: 5,
          keyframes: [
            {
              frame_index: 0,
            },
            {
              frame_index: 120,
            },
          ],
          resolution: '720p',
          aspect_ratio: 'auto',
        },
      },
    ],
  },
  {
    id: 'flux-3-max/image-to-video',
    name: 'Flux 3 Max',
    category: 'video',
    icon: 'Flux',
    actions: [
      {
        id: 'verified-image-to-video',
        name: 'Create video',
        endpoint: 'flux-3-max/image-to-video',
        fields: [
          {
            key: 'prompt',
            label: 'Creative brief',
            required: true,
            kind: 'textarea',
            maxLength: 3000,
          },
          {
            key: 'image_urls',
            label: 'Public image links (one per line)',
            required: true,
            kind: 'urls',
          },
        ],
        defaults: {
          sound: true,
          duration: 5,
          resolution: '720p',
          aspect_ratio: 'auto',
        },
      },
    ],
  },
  {
    id: 'flux-3-klein-edit',
    name: 'Flux 3 Klein Edit',
    category: 'image',
    icon: 'Flux',
    actions: [
      {
        id: 'verified-flux-3-klein-edit',
        name: 'Create image',
        endpoint: 'flux-3-klein-edit',
        fields: [
          {
            key: 'prompt',
            label: 'Creative brief',
            required: true,
            kind: 'textarea',
            maxLength: 3000,
          },
          {
            key: 'image_urls',
            label: 'Public image links (one per line)',
            required: true,
            kind: 'urls',
          },
        ],
        defaults: {
          n: 1,
          size: '4:3',
          resolution: '1K',
          output_format: 'png',
          enable_safety_checker: true,
        },
      },
    ],
  },
  {
    id: 'flux-3-klein',
    name: 'Flux 3 Klein',
    category: 'image',
    icon: 'Flux',
    actions: [
      {
        id: 'verified-flux-3-klein',
        name: 'Create image',
        endpoint: 'flux-3-klein',
        fields: [
          {
            key: 'prompt',
            label: 'Creative brief',
            required: true,
            kind: 'textarea',
            maxLength: 3000,
          },
        ],
        defaults: {
          n: 1,
          size: '16:9',
          resolution: '1K',
          output_format: 'png',
          enable_safety_checker: true,
        },
      },
    ],
  },
  {
    id: 'openai/gpt-image-2.6-flare',
    name: 'GPT Image 2.6 Flare',
    category: 'image',
    icon: 'OpenAI',
    actions: [
      {
        id: 'verified-gpt-image-2.6-flare',
        name: 'Create image',
        endpoint: 'openai/gpt-image-2.6-flare',
        fields: [
          {
            key: 'prompt',
            label: 'Creative brief',
            required: true,
            kind: 'textarea',
            maxLength: 3000,
          },
        ],
        defaults: {
          input_urls: [],
          resolution: '1k',
          aspect_ratio: '16:9',
        },
      },
    ],
  },
  {
    id: 'openai/gpt-image-2.6-sunburst',
    name: 'GPT Image 2.6 Sunburst',
    category: 'image',
    icon: 'OpenAI',
    actions: [
      {
        id: 'verified-gpt-image-2.6-sunburst',
        name: 'Create image',
        endpoint: 'openai/gpt-image-2.6-sunburst',
        fields: [
          {
            key: 'prompt',
            label: 'Creative brief',
            required: true,
            kind: 'textarea',
            maxLength: 3000,
          },
          {
            key: 'input_urls',
            label: 'Public image links (one per line)',
            required: true,
            kind: 'urls',
          },
        ],
        defaults: {
          resolution: '1k',
          aspect_ratio: '3:2',
        },
      },
    ],
  },
  {
    id: 'openai/gpt-image-2.5',
    name: 'GPT Image 2.5',
    category: 'image',
    icon: 'OpenAI',
    actions: [
      {
        id: 'verified-gpt-image-2.5',
        name: 'Create image',
        endpoint: 'openai/gpt-image-2.5',
        fields: [
          {
            key: 'prompt',
            label: 'Creative brief',
            required: true,
            kind: 'textarea',
            maxLength: 3000,
          },
        ],
        defaults: {
          input_urls: [],
          resolution: '1k',
          aspect_ratio: 'auto',
        },
      },
    ],
  },
  {
    id: 'openai/gpt-image-2.5-flare',
    name: 'GPT Image 2.5 Flare',
    category: 'image',
    icon: 'OpenAI',
    actions: [
      {
        id: 'verified-gpt-image-2.5-flare',
        name: 'Create image',
        endpoint: 'openai/gpt-image-2.5-flare',
        fields: [
          {
            key: 'prompt',
            label: 'Creative brief',
            required: true,
            kind: 'textarea',
            maxLength: 3000,
          },
        ],
        defaults: {
          input_urls: [],
          resolution: '1k',
          aspect_ratio: 'auto',
        },
      },
    ],
  },
  {
    id: 'openai/gpt-image-2.5-sunburst',
    name: 'GPT Image 2.5 Sunburst',
    category: 'image',
    icon: 'OpenAI',
    actions: [
      {
        id: 'verified-gpt-image-2.5-sunburst',
        name: 'Create image',
        endpoint: 'openai/gpt-image-2.5-sunburst',
        fields: [
          {
            key: 'prompt',
            label: 'Creative brief',
            required: true,
            kind: 'textarea',
            maxLength: 3000,
          },
        ],
        defaults: {
          input_urls: [],
          resolution: '1k',
          aspect_ratio: 'auto',
        },
      },
    ],
  },
  {
    id: 'flux/flux-pro-image-2',
    name: 'Flux Pro Image 2',
    category: 'image',
    icon: 'Flux',
    actions: [
      {
        id: 'verified-flux-pro-image-2',
        name: 'Create image',
        endpoint: 'flux/flux-pro-image-2',
        fields: [
          {
            key: 'prompt',
            label: 'Creative brief',
            required: true,
            kind: 'textarea',
            maxLength: 3000,
          },
        ],
        defaults: {
          resolution: '1K',
          aspect_ratio: '1:1',
          nsfw_checker: false,
        },
      },
    ],
  },
  {
    id: 'google/nano-banana-2-lite',
    name: 'Nano Banana 2 Lite',
    category: 'image',
    icon: 'Gemini.Color',
    actions: [
      {
        id: 'verified-nano-banana-2-lite',
        name: 'Create image',
        endpoint: 'google/nano-banana-2-lite',
        fields: [
          {
            key: 'prompt',
            label: 'Creative brief',
            required: true,
            kind: 'textarea',
            maxLength: 3000,
          },
          {
            key: 'image_urls',
            label: 'Public image links (one per line)',
            required: true,
            kind: 'urls',
          },
        ],
        defaults: {
          aspect_ratio: 'auto',
        },
      },
    ],
  },
  {
    id: 'suno/boost-style',
    name: 'Suno/Boost Style',
    category: 'audio',
    icon: 'Suno',
    actions: [
      {
        id: 'verified-boost-style',
        name: 'Improve music style',
        endpoint: 'suno/boost-style',
        fields: [
          {
            key: 'content',
            label: 'Music style',
            required: true,
            kind: 'textarea',
            maxLength: 3000,
          },
        ],
        defaults: {},
      },
    ],
  },
  {
    id: 'suno/generate-agent',
    name: 'Suno/Generate Agent',
    category: 'audio',
    icon: 'Suno',
    actions: [
      {
        id: 'verified-generate-agent',
        name: 'Create a song from an idea',
        endpoint: 'suno/generate-agent',
        fields: [
          {
            key: 'prompt',
            label: 'Creative brief',
            required: true,
            kind: 'textarea',
            maxLength: 3000,
          },
          {
            key: 'title',
            label: 'Song title',
            required: true,
            maxLength: 1000,
          },
          {
            key: 'style',
            label: 'Music style',
            required: true,
            maxLength: 1000,
          },
        ],
        defaults: {},
      },
    ],
  },
  {
    id: 'suno/mashup',
    name: 'Suno/Mashup',
    category: 'audio',
    icon: 'Suno',
    actions: [
      {
        id: 'verified-mashup',
        name: 'Mix two audio files',
        endpoint: 'suno/mashup',
        fields: [
          {
            key: 'style',
            label: 'Music style',
            required: true,
            maxLength: 1000,
          },
          {
            key: 'title',
            label: 'Song title',
            required: true,
            maxLength: 1000,
          },
          {
            key: 'prompt',
            label: 'Creative brief',
            required: true,
            kind: 'textarea',
            maxLength: 3000,
          },
          {
            key: 'uploadUrlList',
            label: 'Public audio links (one per line)',
            required: true,
            kind: 'urls',
          },
        ],
        defaults: {
          model: 'V5',
          duration: 10,
          customMode: false,
          audioWeight: 0.65,
          styleWeight: 0.61,
          vocalGender: 'f',
          instrumental: false,
          weirdnessConstraint: 0.2,
        },
      },
    ],
  },
  {
    id: 'suno/sounds',
    name: 'Suno/Sounds',
    category: 'audio',
    icon: 'Suno',
    actions: [
      {
        id: 'verified-sounds',
        name: 'Generate sound effects',
        endpoint: 'suno/sounds',
        fields: [
          {
            key: 'prompt',
            label: 'Creative brief',
            required: true,
            kind: 'textarea',
            maxLength: 3000,
          },
        ],
        defaults: {
          model: 'V5',
          soundKey: 'Any',
          soundLoop: false,
          grabLyrics: false,
          soundTempo: 96,
        },
      },
    ],
  },
  {
    id: 'google/nano-banana-pro',
    name: 'Nano Banana Pro',
    category: 'image',
    icon: 'Gemini.Color',
    actions: [
      {
        id: 'verified-nano-banana-pro',
        name: 'Create image',
        endpoint: 'google/nano-banana-pro',
        fields: [
          {
            key: 'prompt',
            label: 'Creative brief',
            required: true,
            kind: 'textarea',
            maxLength: 3000,
          },
        ],
        defaults: {
          resolution: '1K',
          aspect_ratio: 'LANDSCAPE',
        },
      },
    ],
  },
]
