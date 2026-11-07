import { afterEach, expect, it } from 'vitest'

import {
  DEFAULT_CURRENCY_CONFIG,
  useSystemConfigStore,
} from '@/stores/system-config-store'

import { formatCurrencyFromUSD, formatQuotaWithCurrency } from '../currency'

const original = useSystemConfigStore.getState().config.currency
afterEach(() =>
  useSystemConfigStore.getState().setConfig({ currency: original })
)
it('converts USD and raw quota into customer credits without changing accounting units', () => {
  useSystemConfigStore
    .getState()
    .setConfig({
      currency: {
        ...DEFAULT_CURRENCY_CONFIG,
        quotaDisplayType: 'CUSTOM',
        customCurrencySymbol: 'credit',
        customCurrencyExchangeRate: 1000,
      },
    })
  expect(formatCurrencyFromUSD(1, { locale: 'en-US', abbreviate: false })).toBe(
    '1,000 credit'
  )
  expect(
    formatQuotaWithCurrency(500000, { locale: 'en-US', abbreviate: false })
  ).toBe('1,000 credit')
  expect(
    formatQuotaWithCurrency(210, { locale: 'en-US', abbreviate: false })
  ).toBe('0.42 credit')
  expect(formatQuotaWithCurrency(0, { locale: 'en-US' })).toBe('0 credit')
})
