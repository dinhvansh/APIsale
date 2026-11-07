import { createFileRoute } from '@tanstack/react-router'

import { PlaygroundPreview } from '@/features/playground-preview'

export const Route = createFileRoute('/playground-preview/')({
  component: PlaygroundPreview,
})
