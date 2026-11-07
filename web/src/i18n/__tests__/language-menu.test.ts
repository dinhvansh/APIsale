import { expect, it } from 'vitest'

import { SELECTABLE_INTERFACE_LANGUAGE_OPTIONS } from '../languages'

it('hides both Chinese variants and preserves the other menu languages', () => {
  expect(
    SELECTABLE_INTERFACE_LANGUAGE_OPTIONS.map((language) => language.code)
  ).toEqual(['en', 'fr', 'ru', 'ja', 'vi'])
})
