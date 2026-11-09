import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import { render, screen, within } from '@testing-library/react'
import { expect, it } from 'vitest'

import { STATUS_QUERY_KEY } from '@/lib/status-query'
import { useSystemConfigStore } from '@/stores/system-config-store'

import { Footer } from '../footer'

it('shows BeeskyBase copyright without an upstream project line on the public footer', async () => {
  useSystemConfigStore
    .getState()
    .setConfig({
      systemName: '',
      logo: '',
      footerHtml: '',
      demoSiteEnabled: false,
    })
  const client = new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity } },
  })
  client.setQueryData(STATUS_QUERY_KEY, {
    user_agreement_enabled: true,
    privacy_policy_enabled: true,
  })
  const root = createRootRoute({
    component: () => (
      <QueryClientProvider client={client}>
        <Footer />
      </QueryClientProvider>
    ),
  })
  const router = createRouter({
    routeTree: root,
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })
  render(<RouterProvider router={router} />)
  const footer = within(await screen.findByRole('contentinfo'))
  expect(footer.getByRole('link', { name: /BeeskyBase/ })).toBeVisible()
  expect(footer.queryByText(/New API|QuantumNous/)).not.toBeInTheDocument()
  expect(footer.getByRole('link', { name: 'User Agreement' })).toHaveAttribute(
    'href',
    '/user-agreement'
  )
  expect(footer.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute(
    'href',
    '/privacy-policy'
  )
  client.clear()
  useSystemConfigStore
    .getState()
    .setConfig({ systemName: 'BeeskyBase', logo: '/beesky-logo.svg' })
})
