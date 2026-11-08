import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import i18next from 'i18next'
import { afterEach, expect, it } from 'vitest'

import { LanguageSwitcher } from '../language-switcher'

afterEach(async () => {
  await act(() => i18next.changeLanguage('en'))
})

it('shows VI on the language button when Vietnamese is selected', async () => {
  await act(() => i18next.changeLanguage('vi'))
  render(<LanguageSwitcher />)
  expect(screen.getByRole('button').textContent).toContain('VI')
})

it('updates the visible language code after choosing English', async () => {
  await act(() => i18next.changeLanguage('vi'))
  render(<LanguageSwitcher />)
  await userEvent.click(screen.getByRole('button'))
  await userEvent.click(
    await screen.findByRole('menuitem', { name: 'English' })
  )
  expect(screen.getByRole('button').textContent).toContain('EN')
})
