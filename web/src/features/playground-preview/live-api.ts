import { api } from '@/lib/api'

import {
  type LiveAction,
  type StudioCategory,
  buildStudioPayload,
} from './live-catalog'

export type StudioArtifact = { key: string; type: string; content_url: string }
export type StudioResult = {
  task_id?: string
  status: string
  progress?: string
  created_at?: number
  finished_at?: number
  quota?: number
  text?: string
  tracks?: { id: string; title: string }[]
  artifacts?: StudioArtifact[]
}
export type StudioDemo = {
  id: string
  category: StudioCategory
  model: string
  functionId: string
  title: string
  prompt: string
  createdAt: string
  artifacts: StudioArtifact[]
  text?: string
}
export async function submitStudio(
  action: LiveAction,
  category: StudioCategory,
  values: Record<string, string>
): Promise<StudioResult> {
  const r = await api.post(
    category === 'chat' ? '/pg/chat/completions' : '/pg/tasks',
    buildStudioPayload(action, category, values),
    { skipErrorHandler: true, timeout: 180000 }
  )
  if (category === 'chat') {
    const text = r.data.choices?.[0]?.message?.content
    if (typeof text !== 'string' || !text.trim()) {
      throw new Error('No usable output was returned.')
    }
    return { status: 'SUCCESS', text, artifacts: [] }
  }
  if (typeof r.data.task_id !== 'string') {
    throw new Error('The request was not accepted.')
  }
  return { task_id: r.data.task_id, status: 'SUBMITTED', artifacts: [] }
}
export async function readStudioResult(id: string): Promise<StudioResult> {
  const { data } = await api.get(`/pg/tasks/${encodeURIComponent(id)}/result`, {
    skipErrorHandler: true,
  })
  if (data.status === 'SUCCESS') {
    const { data: files } = await api.get(
      `/pg/tasks/${encodeURIComponent(id)}/artifacts`,
      { skipErrorHandler: true }
    )
    return { ...data, artifacts: files.artifacts ?? [] }
  }
  return data
}
export async function studioHistory(): Promise<
  { task_id: string; status: string; model: string }[]
> {
  const { data } = await api.get('/api/task/self', {
    params: { p: 1, page_size: 20 },
    skipErrorHandler: true,
  })
  return (data.data?.items ?? []).map(
    (item: {
      task_id: string
      status: string
      properties?: { origin_model_name?: string }
    }) => ({
      task_id: item.task_id,
      status: item.status,
      model: item.properties?.origin_model_name ?? '',
    })
  )
}
