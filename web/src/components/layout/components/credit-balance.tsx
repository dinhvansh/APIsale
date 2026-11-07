import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { Wallet } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { buttonVariants } from '@/components/ui/button'
import { getSelf } from '@/lib/api'
import { formatQuotaWithCurrency } from '@/lib/currency'
import { useAuthStore } from '@/stores/auth-store'
import { useSystemConfigStore } from '@/stores/system-config-store'

export function CreditBalance() {
  const { t, i18n } = useTranslation()
  const userId = useAuthStore((s) => s.auth.user?.id)
  useSystemConfigStore((s) => s.config.currency)
  const { data, isError } = useQuery({
    queryKey: ['header-balance', userId],
    meta: { errorToast: false },
    queryFn: async () => {
      const response = await getSelf()
      if (!response.success || typeof response.data?.quota !== 'number') {
        throw new Error('Balance unavailable')
      }
      return response.data.quota as number
    },
    enabled: !!userId,
    refetchInterval: 15000,
    refetchOnWindowFocus: true,
  })
  if (!userId) return null
  return (
    <Link
      to='/wallet'
      className={buttonVariants({ variant: 'outline', size: 'sm' })}
      aria-label={t('Account balance')}
      title={t('1 USD = 1,000 credits · 1 credit = 26 VND')}
    >
      <Wallet aria-hidden='true' data-icon='inline-start' />
      <span className='tabular-nums'>
        {data === undefined || isError
          ? '—'
          : formatQuotaWithCurrency(data, {
              locale: i18n.language,
              abbreviate: false,
            })}
      </span>
    </Link>
  )
}
