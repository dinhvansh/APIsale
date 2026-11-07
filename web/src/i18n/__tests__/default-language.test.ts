import { beforeEach, expect, it, vi } from 'vitest'

beforeEach(() => {
  vi.resetModules()
  localStorage.clear()
  vi.doMock('i18next', async (importOriginal) => {
    const actual = await importOriginal<typeof import('i18next')>()
    return { ...actual, default: actual.createInstance() }
  })
})

it('starts in Vietnamese for a visitor without a saved preference', async () => {
  const { default: i18n } = await import('../config')
  await i18n.init()
  expect(i18n.resolvedLanguage).toBe('vi')
})

it('preserves an explicitly saved English preference', async () => {
  localStorage.setItem('i18nextLng', 'en')
  const { default: i18n } = await import('../config')
  await i18n.init()
  expect(i18n.resolvedLanguage).toBe('en')
})
