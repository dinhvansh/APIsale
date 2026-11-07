import { describe, expect, it } from 'vitest'

import { liveModels, visibleLiveModels } from '../live-catalog'

describe('Chat model audit availability', () => {
  it('shows only verified chat models and hides the incompatible WAV action', () => {
    expect(
      visibleLiveModels.filter((model) => model.category === 'chat')
    ).toHaveLength(12)
    expect(
      visibleLiveModels.some((model) => model.id === 'claude-sonnet-5')
    ).toBe(false)
    expect(
      visibleLiveModels
        .find((model) => model.id === 'suno/generate')
        ?.actions.some((action) => action.id === 'wav')
    ).toBe(false)
  })
  it('keeps all 23 audited models and allows only the 12 that returned real responses', () => {
    const chat = liveModels.filter((model) => model.category === 'chat')
    expect(chat).toHaveLength(23)
    expect(chat.filter((model) => !model.actions[0].unavailable)).toHaveLength(
      12
    )
  })
  it('allows tested Opus 4.8 and retains an explanation for unavailable Opus variants', () => {
    expect(
      liveModels.find((model) => model.id === 'claude-opus-4-8')?.actions[0]
        .unavailable
    ).toBeUndefined()
    expect(
      liveModels.find((model) => model.id === 'claude-opus-5')?.actions[0]
        .unavailable
    ).toContain('pricing')
    expect(
      liveModels.find((model) => model.id === 'claude-opus-5-5')?.actions[0]
        .unavailable
    ).toContain('temporarily unavailable')
  })
})
