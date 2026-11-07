/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { TbBuildingBank, TbCircleCheck, TbLoader2 } from 'react-icons/tb'
import { z } from 'zod'

import { CopyButton } from '@/components/copy-button'
import { Dialog } from '@/components/dialog'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toIntlLocale } from '@/i18n/languages'
import { formatCurrencyFromUSD } from '@/lib/currency'
import { formatNumber } from '@/lib/format'
import { handleServerError } from '@/lib/handle-server-error'

import {
  createSePayOrder,
  getSePayInfo,
  getSePayOrder,
  type SePayOrder,
} from '../sepay-api'

const schema = z.object({ amount: z.coerce.number().int().min(1).max(10000) })
type Values = z.infer<typeof schema>

export function SePayTopupCard(props: { onPaid: () => void }) {
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()
  const onPaid = props.onPaid
  const locale = toIntlLocale(i18n.resolvedLanguage || i18n.language)
  const info = useQuery({ queryKey: ['sepay-info'], queryFn: getSePayInfo })
  const [order, setOrder] = useState<SePayOrder | null>(null)
  const [open, setOpen] = useState(false)
  const [qrFailed, setQRFailed] = useState(false)
  const completed = useRef<string | null>(null)
  const form = useForm<Values>({
    resolver: zodResolver(schema) as Resolver<Values>,
    defaultValues: { amount: 1 },
  })
  const amount = form.watch('amount')
  const create = useMutation({
    mutationFn: createSePayOrder,
    onSuccess: (value) => {
      setOrder(value)
      setQRFailed(false)
      setOpen(true)
    },
    onError: (error) => handleServerError(error, t('Failed to create order')),
  })
  const payment = useQuery({
    queryKey: ['sepay-order', order?.code],
    queryFn: () => getSePayOrder(order?.code || ''),
    enabled: open && Boolean(order),
    refetchInterval: (query) =>
      ['success', 'expired'].includes(query.state.data?.status || '')
        ? false
        : 3000,
    refetchIntervalInBackground: false,
  })
  const status = payment.data?.status || order?.status
  useEffect(() => {
    if (status === 'success' && order && completed.current !== order.code) {
      completed.current = order.code
      onPaid()
      void queryClient.invalidateQueries({ queryKey: ['header-balance'] })
    }
  }, [status, order, onPaid, queryClient])
  if (!info.data?.enabled) {
    return null
  }
  const vnd = (value: number) => `${formatNumber(value, locale)} VNĐ`
  const expires = order
    ? new Date(order.expires_at * 1000).toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
      })
    : ''
  return (
    <Card className='gap-0 overflow-hidden border-yellow-400/40 py-0'>
      <CardHeader className='border-b p-5'>
        <CardTitle className='flex items-center gap-2'>
          <TbBuildingBank className='size-5' aria-hidden='true' />
          {t('MB Bank transfer')}
        </CardTitle>
        <CardDescription>
          {t(
            'Scan the QR code to top up. Your balance updates automatically after payment.'
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4 p-5'>
        <p className='text-muted-foreground text-sm'>
          {t('Exchange rate')}: 1 USD = {vnd(info.data.vnd_per_usd)}
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) =>
              create.mutate(values.amount)
            )}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Balance to add (USD)')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      inputMode='numeric'
                      min={1}
                      max={info.data.max_usd}
                      step={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex flex-wrap items-center justify-between gap-3'>
              <p className='text-sm'>
                {t('Balance to receive')}:{' '}
                <strong>
                  {formatCurrencyFromUSD(Number(amount), {
                    locale,
                    abbreviate: false,
                  })}
                </strong>
                <br />
                {t('Amount to pay:')}{' '}
                <strong>
                  {Number.isFinite(Number(amount)) && Number(amount) > 0
                    ? vnd(Number(amount) * info.data.vnd_per_usd)
                    : '—'}
                </strong>
              </p>
              <Button type='submit' disabled={create.isPending}>
                {create.isPending && (
                  <TbLoader2 className='animate-spin' aria-hidden='true' />
                )}
                {t('Create payment QR')}
              </Button>
            </div>
            {order && status !== 'success' && (
              <Button
                type='button'
                variant='outline'
                onClick={() => setOpen(true)}
              >
                {t('View payment QR')}
              </Button>
            )}
            <p className='text-muted-foreground text-xs'>
              {t(
                'MB Bank uses the exchange rate above. Other payment discounts do not apply.'
              )}
            </p>
          </form>
        </Form>
      </CardContent>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title={t('MB Bank transfer')}
        description={t(
          'Use the exact amount and transfer description shown below.'
        )}
        contentClassName='sm:max-w-md'
      >
        {order && (
          <div className='space-y-4'>
            {status === 'success' ? (
              <div className='space-y-3 py-8 text-center' role='status'>
                <TbCircleCheck
                  className='mx-auto size-14 text-green-600'
                  aria-hidden='true'
                />
                <p className='text-xl font-bold'>{t('Payment received')}</p>
                <p>{t('Your wallet balance has been updated.')}</p>
              </div>
            ) : (
              <>
                {status === 'expired' ? (
                  <p role='status' className='bg-muted rounded-xl p-4 text-sm'>
                    {t(
                      'This QR has expired. Do not transfer money. Create a new payment QR.'
                    )}
                  </p>
                ) : (
                  <div className='text-center'>
                    {qrFailed ? (
                      <p role='alert'>
                        {t(
                          'QR image could not load. Use the bank details below to transfer.'
                        )}
                      </p>
                    ) : (
                      <img
                        src={order.qr_url}
                        alt={t('MB Bank payment QR code')}
                        onError={() => setQRFailed(true)}
                        className='mx-auto size-56 max-w-full rounded-xl bg-white p-3'
                      />
                    )}
                    <p className='mt-2 text-2xl font-bold'>
                      {vnd(order.amount_vnd)}
                    </p>
                  </div>
                )}
                <dl className='space-y-3 rounded-xl border p-4 text-sm'>
                  <div>
                    <dt className='text-muted-foreground'>{t('Bank')}</dt>
                    <dd>MB Bank</dd>
                  </div>
                  <div>
                    <dt className='text-muted-foreground'>
                      {t('Account holder')}
                    </dt>
                    <dd className='font-semibold break-words'>
                      {order.account_name}
                    </dd>
                  </div>
                  <div>
                    <dt className='text-muted-foreground'>
                      {t('Account number')}
                    </dt>
                    <dd className='flex items-center justify-between gap-2 font-mono'>
                      {order.account_number}
                      <CopyButton
                        value={order.account_number}
                        aria-label={t('Copy account number')}
                      />
                    </dd>
                  </div>
                  <div>
                    <dt className='text-muted-foreground'>
                      {t('Transfer description')}
                    </dt>
                    <dd className='flex items-center justify-between gap-2 font-mono'>
                      {order.code}
                      <CopyButton
                        value={order.code}
                        aria-label={t('Copy transfer description')}
                      />
                    </dd>
                  </div>
                </dl>
                {status !== 'expired' && (
                  <p
                    role='status'
                    className='text-muted-foreground flex items-center gap-2 text-sm'
                  >
                    <TbLoader2
                      className='size-4 shrink-0 animate-spin'
                      aria-hidden='true'
                    />
                    {t('Waiting for payment. QR valid until {{time}}.', {
                      time: expires,
                    })}
                  </p>
                )}
                {payment.isError && (
                  <p role='alert' className='text-sm'>
                    {t(
                      'Cannot check payment status right now. We will keep trying. Do not pay twice.'
                    )}
                  </p>
                )}
                <p className='text-muted-foreground text-xs'>
                  {t(
                    'If you transferred the wrong amount or paid after expiry, contact support with your transfer receipt. Do not pay again.'
                  )}
                </p>
              </>
            )}
          </div>
        )}
      </Dialog>
    </Card>
  )
}
