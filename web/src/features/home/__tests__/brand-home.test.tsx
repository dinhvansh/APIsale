import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Hero } from '../components/sections/hero'

for (const authenticated of [false, true]) {
  describe(`brand home (authenticated=${authenticated})`, () => {
    it('shows brand content and routes the primary action to the right destination', async () => {
      const user = userEvent.setup()
      const root = createRootRoute({
        component: () => (
          <QueryClientProvider client={new QueryClient()}>
            <Hero isAuthenticated={authenticated} />
          </QueryClientProvider>
        ),
      })
      const router = createRouter({
        routeTree: root,
        history: createMemoryHistory({ initialEntries: ['/'] }),
      })
      render(<RouterProvider router={router} />)
      expect(
        await screen.findByRole('heading', {
          level: 1,
          name: 'Your AI workspace. One connection.',
        })
      ).toBeVisible()
      expect(
        screen.getByRole('button', {
          name: authenticated ? /Go to Dashboard/ : /Get Started/,
        })
      ).toHaveAttribute('href', authenticated ? '/dashboard' : '/sign-up')
      expect(screen.getByRole('img', { name: 'BeeskyBase' })).toHaveAttribute(
        'src',
        '/beesky-logo.svg'
      )
      expect(
        screen.queryByRole('link', { name: /Cherry Studio|CC Switch/ })
      ).not.toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: 'Copy API endpoint' })
      ).toBeEnabled()
      await user.click(
        screen.getByRole('button', { name: 'Copy API endpoint' })
      )
      expect(await navigator.clipboard.readText()).toBe(
        `${window.location.origin}/v1`
      )
      expect(screen.getByRole('button', { name: 'Copied' })).toBeVisible()
    })
  })
}
