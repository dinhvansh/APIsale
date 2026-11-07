import { createFileRoute } from '@tanstack/react-router'

import { Documentation } from '@/features/documentation'

export const Route = createFileRoute('/docs/')({ component: Documentation })
