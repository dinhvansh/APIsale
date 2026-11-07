import { expect, it } from 'vitest'

import { visibleLiveModels } from '@/features/playground-preview/live-catalog'

import { documentationPayload, documentationExamples } from '../examples'

it('builds valid examples for every visible function using public URLs and environment keys', () => {
  for (const model of visibleLiveModels) {
    for (const action of model.actions) {
      const payload = documentationPayload(action, model.category)
      expect(payload.model).toBe(action.endpoint)
      const examples = documentationExamples(payload, model.category === 'chat')
      expect(examples.curl).toContain(
        'Authorization: Bearer $BEESKYBASE_API_KEY'
      )
      expect(examples.curl.split(String.fromCharCode(92, 10))).toHaveLength(4)
      expect(
        JSON.parse(examples.curl.split("--data '")[1].slice(0, -1))
      ).toEqual(payload)
      for (const code of Object.values(examples)) {
        expect(code).not.toMatch(/apipass|newapi\.pro|sk-[A-Za-z0-9]{20}/i)
        expect(code).toContain('https://api.beeskybase.com/')
      }
    }
  }
})
