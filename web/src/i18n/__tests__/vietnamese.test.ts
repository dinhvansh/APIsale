import { createInstance } from 'i18next'
import { describe, expect, it } from 'vitest'

import en from '../locales/en.json'
import vi from '../locales/vi.json'

describe('Vietnamese interface language', () => {
  it('loads brand copy from the translation namespace instead of falling back to English', async () => {
    const i18n = createInstance()
    await i18n.init({ lng: 'vi', fallbackLng: 'en', resources: { en, vi } })
    for (const key of [
      'Your AI workspace. One connection.',
      'Your keys, your control',
      'Models, connected',
      'Usage, made clear',
    ]) {
      expect(i18n.exists(key, { lng: 'vi', fallbackLng: false })).toBe(true)
      expect(i18n.t(key)).not.toBe(key)
    }
  })

  it('distinguishes account registration, service plans, tokens and routing weight', async () => {
    const i18n = createInstance()
    await i18n.init({ lng: 'vi', resources: { vi } })
    expect(i18n.t('Sign up')).toBe('Đăng ký')
    expect(i18n.t('Subscriptions')).toBe('Gói dịch vụ')
    expect(i18n.t('Tokens')).toBe('Token')
    expect(i18n.t('Weight')).toBe('Trọng số')
    expect(i18n.t('Playground')).toBe('Thử nghiệm AI')
  })

  it('keeps dynamic amounts and durations in the translated messages', async () => {
    const i18n = createInstance()
    await i18n.init({ lng: 'vi', resources: { vi } })
    expect(i18n.t('{{count}} days remaining', { count: 3 })).toBe('Còn 3 ngày')
    expect(
      i18n.t('Redemption successful! Added: {{quota}}', { quota: '100.000 đ' })
    ).toBe('Nạp tiền thành công! Đã cộng: 100.000 đ')
  })
})
