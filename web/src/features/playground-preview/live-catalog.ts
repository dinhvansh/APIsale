import { verifiedChatModels } from './chat-verification'
import { expansionModels } from './expansion-models'

export type StudioCategory = 'video' | 'image' | 'chat' | 'audio' | 'tools'
export type LiveField = {
  key: string
  label: string
  kind?: 'text' | 'textarea' | 'number' | 'url' | 'urls' | 'song'
  required?: boolean
  options?: string[]
  value?: string
  min?: number
  max?: number
  maxLength?: number
}
export type LiveAction = {
  id: string
  name: string
  endpoint: string
  fields: LiveField[]
  defaults?: Record<string, unknown>
  unavailable?: string
}
export type LiveModel = {
  id: string
  name: string
  category: StudioCategory
  icon: string
  actions: LiveAction[]
}
const prompt: LiveField = {
  key: 'prompt',
  label: 'Creative brief',
  kind: 'textarea',
  required: true,
  maxLength: 3000,
}
const title: LiveField = {
  key: 'title',
  label: 'Song title',
  required: true,
  maxLength: 80,
}
const style: LiveField = {
  key: 'style',
  label: 'Music style',
  required: true,
  maxLength: 1000,
  value: 'Acoustic, warm piano, gentle guitar',
}
const audioUrl: LiveField = {
  key: 'audioUrl',
  label: 'Public audio link',
  kind: 'url',
  required: true,
}
const duration: LiveField = {
  key: 'duration',
  label: 'Duration in seconds',
  kind: 'number',
  required: true,
  min: 4,
  max: 15,
  value: '5',
}
const aspect: LiveField = {
  key: 'aspect_ratio',
  label: 'Aspect ratio',
  options: ['16:9', '9:16', '1:1'],
  value: '16:9',
}
const resolution: LiveField = {
  key: 'resolution',
  label: 'Resolution',
  options: ['480p', '720p'],
  value: '480p',
}
const images: LiveField = {
  key: 'images',
  label: 'Public image links (one per line)',
  kind: 'urls',
  required: true,
}
const song: LiveField = {
  key: 'song',
  label: 'Choose one of your songs',
  kind: 'song',
  required: true,
}
const exclusions: LiveField = {
  key: 'negativeTags',
  label: 'Styles to avoid',
  required: true,
  value: 'none',
  maxLength: 1000,
}
const version: LiveField = {
  key: 'model',
  label: 'Music model version',
  options: ['V4_5PLUS', 'V5', 'V5_5'],
  value: 'V5',
}
export const liveModels: LiveModel[] = [
  {
    id: 'bytedance/seedance-2-mini',
    name: 'Seedance 2 Mini',
    category: 'video',
    icon: 'ByteDance.Color',
    actions: [
      {
        id: 'text-video',
        name: 'Text to video',
        endpoint: 'bytedance/seedance-2-mini',
        fields: [prompt, duration, resolution, aspect],
      },
      {
        id: 'image-video',
        name: 'Image to video',
        endpoint: 'bytedance/seedance-2-mini',
        fields: [
          prompt,
          { ...images, key: 'reference_image_urls' },
          duration,
          resolution,
          aspect,
        ],
      },
    ],
  },
  {
    id: 'google/veo-3-1-fast',
    name: 'Veo 3.1 Fast',
    category: 'video',
    icon: 'Gemini.Color',
    actions: [
      {
        id: 'text-video',
        name: 'Text to video',
        endpoint: 'google/veo-3-1-fast',
        defaults: { video_generate_type: 'text_to_video' },
        fields: [
          prompt,
          { ...resolution, options: ['720p', '1080p', '4k'], value: '720p' },
          { ...aspect, options: ['LANDSCAPE', 'PORTRAIT'], value: 'LANDSCAPE' },
        ],
      },
      {
        id: 'image-video',
        name: 'Image to video',
        endpoint: 'google/veo-3-1-fast',
        defaults: { video_generate_type: 'frames_to_video' },
        fields: [
          prompt,
          images,
          { ...resolution, options: ['720p', '1080p', '4k'], value: '720p' },
          { ...aspect, options: ['LANDSCAPE', 'PORTRAIT'], value: 'LANDSCAPE' },
        ],
      },
    ],
  },
  {
    id: 'kling/kling-2-6',
    name: 'Kling 2.6',
    category: 'video',
    icon: 'Kling.Color',
    actions: [
      {
        id: 'text-video',
        name: 'Text to video',
        endpoint: 'kling/kling-2-6',
        fields: [
          prompt,
          { ...duration, min: 5, max: 10, options: ['5', '10'] },
          aspect,
        ],
        defaults: { generate_audio: false },
      },
    ],
  },
  {
    id: 'openai/gpt-image-2',
    name: 'GPT Image 2',
    category: 'image',
    icon: 'OpenAI',
    actions: [
      {
        id: 'text-image',
        name: 'Text to image',
        endpoint: 'openai/gpt-image-2',
        fields: [
          prompt,
          { ...resolution, options: ['1k', '2k', '4k'], value: '1k' },
          {
            key: 'quality',
            label: 'Quality',
            options: ['low', 'medium', 'high'],
            value: 'low',
          },
          aspect,
        ],
      },
      {
        id: 'edit-image',
        name: 'Edit an image',
        endpoint: 'openai/gpt-image-2',
        fields: [
          prompt,
          images,
          { ...resolution, options: ['1k', '2k', '4k'], value: '1k' },
          {
            key: 'quality',
            label: 'Quality',
            options: ['low', 'medium', 'high'],
            value: 'low',
          },
          aspect,
        ],
      },
    ],
  },
  {
    id: 'google/nano-banana-2',
    name: 'Nano Banana 2',
    category: 'image',
    icon: 'Gemini.Color',
    actions: [
      {
        id: 'text-image',
        name: 'Text to image',
        endpoint: 'google/nano-banana-2',
        fields: [
          prompt,
          { ...resolution, options: ['1K', '2K', '4K'], value: '1K' },
          aspect,
        ],
      },
      {
        id: 'edit-image',
        name: 'Edit an image',
        endpoint: 'google/nano-banana-2',
        fields: [
          prompt,
          { ...images, key: 'image_input' },
          { ...resolution, options: ['1K', '2K', '4K'], value: '1K' },
          aspect,
        ],
      },
    ],
  },
  ...verifiedChatModels.map(({ id, name, icon, unavailable }) => ({
    id,
    name,
    category: 'chat' as const,
    icon,
    actions: [
      {
        id: 'chat',
        name: 'Chat',
        endpoint: id,
        unavailable,
        fields: [{ ...prompt, label: 'Your message' }],
      },
    ],
  })),
  {
    id: 'suno/generate',
    name: 'Suno Music',
    category: 'audio',
    icon: 'Suno',
    actions: [
      {
        id: 'music-idea',
        name: 'Create a song from an idea',
        endpoint: 'suno/generate',
        fields: [prompt],
        defaults: { customMode: false, instrumental: false },
      },
      {
        id: 'instrumental',
        name: 'Create instrumental music',
        endpoint: 'suno/generate',
        fields: [prompt],
        defaults: { customMode: false, instrumental: true },
      },
      {
        id: 'music-lyrics',
        name: 'Turn your lyrics into a song',
        endpoint: 'suno/generate',
        fields: [
          title,
          style,
          { ...prompt, label: 'Your lyrics', maxLength: 5000 },
        ],
        defaults: { customMode: true, instrumental: false },
      },
      {
        id: 'add-vocals',
        name: 'Add vocals',
        endpoint: 'suno/add-vocals',
        fields: [
          { ...audioUrl, key: 'uploadUrl' },
          title,
          style,
          prompt,
          exclusions,
          version,
        ],
      },
      {
        id: 'add-instrumental',
        name: 'Add accompaniment',
        endpoint: 'suno/add-instrumental',
        fields: [
          { ...audioUrl, key: 'uploadUrl' },
          title,
          { ...style, key: 'tags' },
          exclusions,
          version,
        ],
      },
      {
        id: 'cover',
        name: 'Change a song style',
        endpoint: 'suno/upload-cover',
        fields: [audioUrl, title, style, prompt],
        defaults: { customMode: true, instrumental: false },
      },
      {
        id: 'extend',
        name: 'Extend a generated song',
        endpoint: 'suno/extend',
        fields: [
          song,
          title,
          style,
          prompt,
          {
            key: 'continueAt',
            label: 'Continue from second',
            kind: 'number',
            required: true,
            min: 1,
            max: 3600,
            value: '30',
          },
        ],
        defaults: { instrumental: false },
      },
      {
        id: 'upload-extend',
        name: 'Extend an audio file',
        endpoint: 'suno/upload-extend',
        fields: [
          audioUrl,
          title,
          style,
          {
            key: 'continueAt',
            label: 'Continue from second',
            kind: 'number',
            required: true,
            min: 1,
            max: 3600,
            value: '30',
          },
          prompt,
        ],
      },
      {
        id: 'separate',
        name: 'Separate vocals and music',
        endpoint: 'suno/vocal-separation',
        fields: [song],
      },
      {
        id: 'lyrics',
        name: 'Write song lyrics',
        endpoint: 'suno/lyrics',
        fields: [{ ...prompt, label: 'Song topic and mood', maxLength: 200 }],
      },
      {
        id: 'wav',
        unavailable:
          'This song source does not support this operation. Choose another song or use the MP3 result.',
        name: 'Export WAV audio',
        endpoint: 'suno/wav',
        fields: [song],
      },
    ],
  },
  {
    id: 'beesky/image-watermark-remove',
    name: 'Image cleanup',
    category: 'tools',
    icon: 'BeeskyBase',
    actions: [
      {
        id: 'clean-image',
        name: 'Clean up an image you own',
        endpoint: 'beesky/image-watermark-remove',
        fields: [
          {
            key: 'image',
            label: 'Public image link',
            kind: 'url',
            required: true,
          },
        ],
      },
    ],
  },
]
export function initialValues(action: LiveAction): Record<string, string> {
  return Object.fromEntries(action.fields.map((f) => [f.key, f.value ?? '']))
}
export function buildStudioPayload(
  action: LiveAction,
  category: StudioCategory,
  values: Record<string, string>
): Record<string, unknown> {
  const input: Record<string, unknown> = structuredClone(action.defaults ?? {})
  for (const field of action.fields) {
    const value = values[field.key]?.trim()
    if (!value) {
      if (field.required) throw new Error('Please fill in all required fields.')
      continue
    }
    if (field.maxLength && value.length > field.maxLength) {
      throw new Error('The text exceeds the allowed length.')
    }
    if (field.kind === 'song') {
      const source: unknown = JSON.parse(value)
      if (
        !Array.isArray(source) ||
        source.length !== 2 ||
        source.some((x) => typeof x !== 'string' || !x)
      ) {
        throw new Error('Please choose one of your completed songs.')
      }
      input.taskId = source[0]
      input.audioId = source[1]
    } else if (field.kind === 'number') {
      const n = Number(value)
      if (
        !Number.isInteger(n) ||
        n < (field.min ?? 0) ||
        n > (field.max ?? 3600)
      ) {
        throw new Error('The number is outside the allowed range.')
      }
      input[field.key] = n
    } else if (field.kind === 'urls') {
      const urls = value
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
      if (urls.length > 5 || urls.some((u) => !/^https:\/\/[^\s]+$/.test(u))) {
        throw new Error('Use public HTTPS links only.')
      }
      input[field.key] = urls
    } else {
      if (field.kind === 'url' && !/^https:\/\/[^\s]+$/.test(value)) {
        throw new Error('Use public HTTPS links only.')
      }
      if (field.options && !field.options.includes(value)) {
        throw new Error('Invalid option.')
      }
      input[field.key] = value
    }
  }
  if (Array.isArray(input.keyframes)) {
    input.keyframes = input.keyframes.map(
      (frame: { frame_index: number }, i: number) => ({
        ...frame,
        image_url: input[`keyframe_${i}`],
      })
    )
    delete input.keyframe_0
    delete input.keyframe_1
  }
  if (category === 'chat') {
    return {
      model: action.endpoint,
      stream: false,
      max_tokens: 1024,
      messages: [{ role: 'user', content: input.prompt }],
    }
  }
  return { model: action.endpoint, input }
}

// Retain audit metadata for rechecks; customers see only verified actions.
const mergedModels = liveModels.map((model) =>
  model.id === 'suno/generate'
    ? {
        ...model,
        actions: [
          ...model.actions,
          ...expansionModels
            .filter((m) => m.category === 'audio')
            .flatMap((m) => m.actions),
        ],
      }
    : model
)

export const visibleLiveModels: LiveModel[] = [
  ...mergedModels,
  ...expansionModels.filter((model) => model.category !== 'audio'),
]
  .map((model) => ({
    ...model,
    actions: model.actions.filter((action) => !action.unavailable),
  }))
  .filter((model) => model.actions.length > 0)
