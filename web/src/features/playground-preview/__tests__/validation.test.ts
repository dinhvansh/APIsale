import { describe, expect, it } from 'vitest'

import {
  buildStudioPayload,
  initialValues,
  liveModels,
  visibleLiveModels,
} from '../live-catalog'

describe('Studio request validation', () => {
  const suno = liveModels.find((model) => model.id === 'suno/generate')
  if (!suno) throw new Error('Missing Suno catalogue')
  it('requires a completed source song before requesting WAV', () => {
    const action = suno.actions.find((item) => item.id === 'wav')
    if (!action) throw new Error('Missing WAV action')
    expect(() => buildStudioPayload(action, 'audio', {})).toThrow()
    const sourceField = action.fields[0].key
    expect(
      buildStudioPayload(action, 'audio', {
        [sourceField]: JSON.stringify(['task_owned', 'track_owned']),
      })
    ).toEqual({
      model: 'suno/wav',
      input: { taskId: 'task_owned', audioId: 'track_owned' },
    })
  })
  it('rejects an incomplete or non HTTPS audio source before submitting', () => {
    const action = suno.actions.find((item) => item.id === 'add-vocals')
    if (!action) throw new Error('Missing vocals action')
    expect(() =>
      buildStudioPayload(action, 'audio', {
        ...initialValues(action),
        uploadUrl: 'http://localhost/song.mp3',
      })
    ).toThrow()
  })
  it('sends a nonstream chat request with the chosen model and complete prompt', () => {
    const model = liveModels.find((item) => item.id === 'claude-haiku-5-5')
    if (!model) throw new Error('Missing chat model')
    expect(
      buildStudioPayload(model.actions[0], 'chat', {
        prompt: 'Introduce a lake cabin',
      })
    ).toEqual({
      model: model.id,
      stream: false,
      max_tokens: 1024,
      messages: [{ role: 'user', content: 'Introduce a lake cabin' }],
    })
  })
  it('builds two keyframes from HTTPS image fields without changing the next request defaults', () => {
    const action = visibleLiveModels.find(
      (model) => model.id === 'flux-3-max/keyframes-to-video'
    )?.actions[0]
    if (!action) throw new Error('Missing Flux keyframes action')
    const values = {
      prompt: 'A calm lake',
      keyframe_0: 'https://example.com/start.png',
      keyframe_1: 'https://example.com/end.png',
    }
    const result = buildStudioPayload(action, 'video', values)
    expect(result.input).toMatchObject({
      keyframes: [
        { frame_index: 0, image_url: values.keyframe_0 },
        { frame_index: 120, image_url: values.keyframe_1 },
      ],
    })
    expect(result.input).not.toHaveProperty('keyframe_0')
    expect(action.defaults?.keyframes).toEqual([
      { frame_index: 0 },
      { frame_index: 120 },
    ])
    expect(() =>
      buildStudioPayload(action, 'video', {
        ...values,
        keyframe_0: 'http://localhost/a.png',
      })
    ).toThrow('Use public HTTPS links only.')
  })
})
