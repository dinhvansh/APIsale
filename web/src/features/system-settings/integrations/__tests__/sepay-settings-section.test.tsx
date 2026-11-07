import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRef } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { api } from '@/lib/api'

import {
  SePaySettingsSection,
  type SePaySettingsHandle,
} from '../sepay-settings-section'

const initial = {
  enabled: true,
  account_number: '8496299396784',
  account_name: 'NGUYEN DINH VAN',
  vnd_per_usd: 26000,
  webhook_secret: '',
}
function Fixture() {
  const ref = useRef<SePaySettingsHandle>(null)
  return (
    <>
      <button
        type='button'
        onClick={async () => {
          if (await ref.current?.validate()) await ref.current?.save()
        }}
      >
        Save all settings
      </button>
      <Tabs defaultValue='sepay'>
        <TabsList>
          <TabsTrigger value='general'>General</TabsTrigger>
          <TabsTrigger value='sepay'>MB Bank / SePay</TabsTrigger>
        </TabsList>
        <TabsContent value='general'>General settings</TabsContent>
        <TabsContent value='sepay' keepMounted>
          <SePaySettingsSection ref={ref} />
        </TabsContent>
      </Tabs>
    </>
  )
}
function setup() {
  let saved = { ...initial }
  const get = vi.spyOn(api, 'get').mockImplementation(async () => ({
    data: { success: true, data: { config: saved, secret_configured: true } },
  }))
  const post = vi
    .spyOn(api, 'post')
    .mockImplementation(async (_url, values) => {
      saved = { ...saved, ...(values as typeof saved) }
      return {
        data: {
          success: true,
          data: {
            config: { ...saved, webhook_secret: '' },
            secret_configured: true,
          },
        },
      }
    })
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
  render(
    <QueryClientProvider client={client}>
      <Fixture />
    </QueryClientProvider>
  )
  return { client, get, post, user: userEvent.setup() }
}
afterEach(() => vi.restoreAllMocks())
describe('SePay settings shared payment actions', () => {
  it('keeps an edited account name when switching tabs and saves it through the shared action without replacing the secret', async () => {
    const { user, post } = setup()
    const name = await screen.findByDisplayValue(initial.account_name)
    await user.clear(name)
    await user.type(name, 'NEW ACCOUNT NAME')
    await user.click(screen.getByRole('tab', { name: 'General' }))
    expect(name).not.toBeVisible()
    await user.click(screen.getByRole('tab', { name: 'MB Bank / SePay' }))
    expect(name).toHaveValue('NEW ACCOUNT NAME')
    await user.click(screen.getByRole('button', { name: 'Save all settings' }))
    await waitFor(() =>
      expect(post).toHaveBeenCalledWith('/api/option/sepay', {
        ...initial,
        account_name: 'NEW ACCOUNT NAME',
      })
    )
    expect(screen.getByDisplayValue('NEW ACCOUNT NAME')).toBeVisible()
  })
  it('keeps unsaved edits when configuration is refreshed in the background', async () => {
    const { user, client } = setup()
    const name = await screen.findByDisplayValue(initial.account_name)
    await user.clear(name)
    await user.type(name, 'UNSAVED NAME')
    await act(async () => {
      client.setQueryData(['sepay-admin'], {
        config: { ...initial, account_name: 'SERVER NAME' },
        secret_configured: true,
      })
    })
    expect(name).toHaveValue('UNSAVED NAME')
  })
  it('blocks the shared save when the entered webhook secret is too short', async () => {
    const { user, post } = setup()
    await screen.findByDisplayValue(initial.account_name)
    await user.type(screen.getByLabelText('SePay webhook API key'), 'short')
    await user.click(screen.getByRole('button', { name: 'Save all settings' }))
    await screen.findByText('Use at least 32 characters for the webhook secret')
    expect(post).not.toHaveBeenCalled()
  })
})
