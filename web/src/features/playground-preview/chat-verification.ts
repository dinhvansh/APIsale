// Real API audit on 2026-11-06. Availability is a snapshot, not a service guarantee.
export const verifiedChatModels: {
  id: string
  name: string
  icon: string
  verifiedAt: string
  unavailable?: string
}[] = [
  {
    id: 'claude-haiku-5-5',
    name: 'Claude Haiku 5.5',
    icon: 'Claude.Color',
    verifiedAt: '2026-11-06',
  },
  {
    id: 'claude-fable-5',
    name: 'Claude Fable 5',
    icon: 'Claude.Color',
    verifiedAt: '2026-11-06',
    unavailable:
      'This model is temporarily unavailable because its upstream pricing is not configured.',
  },
  {
    id: 'claude-fable-5-1',
    name: 'Claude Fable 5.1',
    icon: 'Claude.Color',
    verifiedAt: '2026-11-06',
  },
  {
    id: 'claude-opus-4-8',
    name: 'Claude Opus 4.8',
    icon: 'Claude.Color',
    verifiedAt: '2026-11-06',
  },
  {
    id: 'claude-opus-5',
    name: 'Claude Opus 5',
    icon: 'Claude.Color',
    verifiedAt: '2026-11-06',
    unavailable:
      'This model is temporarily unavailable because its upstream pricing is not configured.',
  },
  {
    id: 'claude-opus-5-5',
    name: 'Claude Opus 5.5',
    icon: 'Claude.Color',
    verifiedAt: '2026-11-06',
    unavailable:
      'This model is temporarily unavailable. Please choose another model.',
  },
  {
    id: 'claude-sonnet-5',
    name: 'Claude Sonnet 5',
    icon: 'Claude.Color',
    verifiedAt: '2026-11-06',
    unavailable:
      'This model is temporarily unavailable. Please choose another model.',
  },
  {
    id: 'gemini-3-flash-preview',
    name: 'Gemini 3 Flash Preview',
    icon: 'Gemini.Color',
    verifiedAt: '2026-11-06',
    unavailable:
      'This model is temporarily unavailable because its upstream pricing is not configured.',
  },
  {
    id: 'gemini-3-pro-preview',
    name: 'Gemini 3 Pro Preview',
    icon: 'Gemini.Color',
    verifiedAt: '2026-11-06',
  },
  {
    id: 'google/gemini-4-argon',
    name: 'Gemini 4 Argon',
    icon: 'Gemini.Color',
    verifiedAt: '2026-11-06',
  },
  {
    id: 'google/gemini-4-argon-openai',
    name: 'Gemini 4 Argon (OpenAI compatible)',
    icon: 'Gemini.Color',
    verifiedAt: '2026-11-06',
  },
  {
    id: 'gpt-5.6-luna',
    name: 'GPT 5.6 Luna',
    icon: 'OpenAI',
    verifiedAt: '2026-11-06',
    unavailable:
      'This model is temporarily unavailable. Please choose another model.',
  },
  {
    id: 'gpt-5.6-sol',
    name: 'GPT 5.6 Sol',
    icon: 'OpenAI',
    verifiedAt: '2026-11-06',
  },
  {
    id: 'gpt-5.6-terra',
    name: 'GPT 5.6 Terra',
    icon: 'OpenAI',
    verifiedAt: '2026-11-06',
    unavailable:
      'This model is temporarily unavailable. Please choose another model.',
  },
  {
    id: 'gpt-6-1-sol',
    name: 'GPT 6.1 Sol',
    icon: 'OpenAI',
    verifiedAt: '2026-11-06',
    unavailable:
      'This model is temporarily unavailable. Please choose another model.',
  },
  {
    id: 'gpt-6-1-terra',
    name: 'GPT 6.1 Terra',
    icon: 'OpenAI',
    verifiedAt: '2026-11-06',
  },
  {
    id: 'gpt-6-astra',
    name: 'GPT 6 Astra',
    icon: 'OpenAI',
    verifiedAt: '2026-11-06',
  },
  {
    id: 'gpt-6-luna',
    name: 'GPT 6 Luna',
    icon: 'OpenAI',
    verifiedAt: '2026-11-06',
    unavailable:
      'This model is temporarily unavailable. Please choose another model.',
  },
  {
    id: 'gpt-6-sol',
    name: 'GPT 6 Sol',
    icon: 'OpenAI',
    verifiedAt: '2026-11-06',
  },
  {
    id: 'grok-build/grok-4.5',
    name: 'Grok 4.5',
    icon: 'Grok',
    verifiedAt: '2026-11-06',
    unavailable:
      'This model is temporarily unavailable. Please choose another model.',
  },
  {
    id: 'grok-build/grok-4.6',
    name: 'Grok 4.6',
    icon: 'Grok',
    verifiedAt: '2026-11-06',
    unavailable:
      'This model is temporarily unavailable. Please choose another model.',
  },
  {
    id: 'grok-build/grok-4.7',
    name: 'Grok 4.7',
    icon: 'Grok',
    verifiedAt: '2026-11-06',
  },
  {
    id: 'openai/gpt-5.5',
    name: 'GPT 5.5',
    icon: 'OpenAI',
    verifiedAt: '2026-11-06',
  },
]
