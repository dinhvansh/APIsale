import { renderHook } from '@testing-library/react'
import { expect, it } from 'vitest'

import { useSidebarData } from '../use-sidebar-data'

it('keeps Studio and hides the unavailable chat preset menu', () => {
  const { result } = renderHook(() => useSidebarData())
  const items = result.current.navGroups.flatMap((group) => group.items)
  expect(
    items.some((item) => 'url' in item && item.url === '/playground')
  ).toBe(true)
  expect(
    items.some((item) => 'type' in item && item.type === 'chat-presets')
  ).toBe(false)
})
