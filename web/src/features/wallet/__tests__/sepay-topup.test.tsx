import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it, vi } from 'vitest'

import { api } from '@/lib/api'

import { SePayTopupCard } from '../components/sepay-topup-card'

const order = {
  code: 'BSK0123456789ABCDEF',
  amount_usd: 2,
  amount_vnd: 52000,
  account_number: '1234567890',
  account_name: 'TEST ACCOUNT',
  bank: 'MB Bank',
  qr_url: 'https://vietqr.app/img?acc=1234567890&amount=52000',
  expires_at: 2000000000,
  status: 'pending',
}
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

function setup(status = 'pending') {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
  const paid = vi.fn()
  vi.spyOn(api, 'get').mockImplementation(async (url) => ({
    data: {
      success: true,
      data: String(url).endsWith('/info')
        ? { enabled: true, vnd_per_usd: 26000, min_usd: 1, max_usd: 10000 }
        : { status },
    },
  }))
  const post = vi
    .spyOn(api, 'post')
    .mockResolvedValue({ data: { success: true, data: order } })
  render(
    <QueryClientProvider client={client}>
      <SePayTopupCard onPaid={paid} />
    </QueryClientProvider>
  )
  return { client, paid, post }
}

it('creates a USD top-up and shows the exact VND amount and bank transfer memo', async () => {
  const user = userEvent.setup()
  const { client, post } = setup()
  const amount = await screen.findByRole('spinbutton', {
    name: 'Balance to add (USD)',
  })
  await user.clear(amount)
  await user.type(amount, '2')
  expect(screen.getByText(/52,000 VNĐ/)).toBeVisible()
  await user.click(screen.getByRole('button', { name: 'Create payment QR' }))
  expect(await screen.findByRole('dialog')).toBeVisible()
  expect(post).toHaveBeenCalledWith('/api/user/sepay/pay', { amount_usd: 2 })
  expect(screen.getByText('TEST ACCOUNT')).toBeVisible()
  expect(screen.getByText(order.code)).toBeVisible()
  await user.click(
    screen.getByRole('button', { name: 'Copy transfer description' })
  )
  expect(await navigator.clipboard.readText()).toBe(order.code)
  client.clear()
})

it('refreshes the wallet once after the server confirms payment', async () => {
  const user = userEvent.setup()
  const { client, paid } = setup('success')
  await user.click(
    await screen.findByRole('button', { name: 'Create payment QR' })
  )
  expect(await screen.findByText('Payment received')).toBeVisible()
  await waitFor(() => expect(paid).toHaveBeenCalledTimes(1))
  expect(
    screen.queryByRole('img', { name: 'MB Bank payment QR code' })
  ).not.toBeInTheDocument()
  client.clear()
})

it('hides the QR and warns against transferring when the server marks an order expired', async () => {
  const user = userEvent.setup()
  const { client, paid } = setup('expired')
  await user.click(
    await screen.findByRole('button', { name: 'Create payment QR' })
  )
  expect(
    await screen.findByText(
      'This QR has expired. Do not transfer money. Create a new payment QR.'
    )
  ).toBeVisible()
  expect(
    screen.queryByRole('img', { name: 'MB Bank payment QR code' })
  ).not.toBeInTheDocument()
  expect(paid).not.toHaveBeenCalled()
  client.clear()
})
