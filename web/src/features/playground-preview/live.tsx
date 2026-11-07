import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Film,
  Image,
  MessageSquare,
  Music2,
  Wrench,
  Sparkles,
  ArrowRight,
  LoaderCircle,
  History,
  Download,
  Clock3,
  Search,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CopyButton } from '@/components/copy-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toIntlLocale } from '@/i18n/languages'
import { api, getUserModels } from '@/lib/api'
import { formatQuotaWithCurrency } from '@/lib/currency'
import { getLobeIcon } from '@/lib/lobe-icon'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth-store'

import {
  readStudioResult,
  submitStudio,
  studioHistory,
  type StudioResult,
  type StudioDemo,
} from './live-api'
import {
  visibleLiveModels as liveModels,
  initialValues,
  buildStudioPayload,
  type LiveAction,
  type StudioCategory,
} from './live-catalog'
import { studioSubmissionError } from './studio-errors'

const categories = [
  { id: 'video', label: 'Video', icon: Film },
  { id: 'image', label: 'Images', icon: Image },
  { id: 'chat', label: 'Chat', icon: MessageSquare },
  { id: 'audio', label: 'Audio', icon: Music2 },
  { id: 'tools', label: 'Tools', icon: Wrench },
] as const
const examples: Record<StudioCategory, string> = {
  video:
    'A peaceful wooden cabin beside a forest lake at sunrise, gentle mist on still water, slow cinematic camera push, natural colors, no text or logos',
  image:
    'A cozy wooden lakeside cabin in a pine forest at sunrise, warm golden light, calm cinematic photography, no text or logo',
  audio:
    'Peaceful acoustic piano music, morning beside a quiet forest lake, gentle guitar, warm cinematic atmosphere',
  chat: 'Viết 3 ý tưởng giới thiệu một homestay bên hồ. Mỗi ý tưởng có tiêu đề và mô tả ngắn, giọng văn gần gũi.',
  tools: '',
}
function ResultMedia(props: { result: StudioResult }) {
  const { t } = useTranslation()
  return (
    <div className='studio-live-media'>
      {props.result.text && (
        <div className='studio-live-text'>
          <CopyButton value={props.result.text} />
          <p>{props.result.text}</p>
        </div>
      )}
      {props.result.artifacts?.map((file, index) => (
        <div key={file.key} className='studio-live-asset'>
          {file.type === 'image' && (
            <img
              src={file.content_url}
              alt={t('Generated image')}
              loading='lazy'
            />
          )}
          {file.type === 'video' && (
            <video
              src={file.content_url}
              controls
              preload='metadata'
              aria-label={t('Generated video')}
            />
          )}
          {file.type === 'audio' && (
            <>
              <h3>
                {t('Audio result')} {index + 1}
              </h3>
              <audio
                src={file.content_url}
                controls
                preload='metadata'
                aria-label={t('Generated audio')}
              />
            </>
          )}
          <a href={file.content_url} target='_blank' rel='noreferrer'>
            <Download size={14} />
            {t('Open or download result')}
          </a>
        </div>
      ))}
      {props.result.status === 'SUCCESS' &&
        !props.result.text &&
        !props.result.artifacts?.length && (
          <p>
            {t(
              'The task finished, but no playable output is available. Check your task history.'
            )}
          </p>
        )}
    </div>
  )
}
export function LivePlayground() {
  const { t, i18n } = useTranslation()
  const locale = toIntlLocale(i18n.resolvedLanguage || i18n.language)
  const [category, setCategory] = useState<StudioCategory>('video')
  const [modelId, setModelId] = useState(liveModels[0].id)
  const model = liveModels.find((m) => m.id === modelId) ?? liveModels[0]
  const [actionId, setActionId] = useState(model.actions[0].id)
  const action =
    model.actions.find((a) => a.id === actionId) ?? model.actions[0]
  const [values, setValues] = useState<Record<string, string>>({
    ...initialValues(action),
    prompt: examples.video,
  })
  const [available, setAvailable] = useState<string[] | null>(null)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<StudioResult | null>(null)
  const [running, setRunning] = useState(false)
  const queryClient = useQueryClient()
  let estimatePayload: Record<string, unknown> | null = null
  try {
    estimatePayload = buildStudioPayload(action, category, values)
  } catch {
    /* Incomplete inputs have no quote. */
  }
  const estimateKey = JSON.stringify(estimatePayload)
  const [debouncedEstimateKey, setDebouncedEstimateKey] = useState(estimateKey)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedEstimateKey(estimateKey), 450)
    return () => clearTimeout(timer)
  }, [estimateKey])
  const estimate = useQuery<{ quota: number; quota_per_usd: number }>({
    queryKey: ['studio-estimate', category, debouncedEstimateKey],
    meta: { errorToast: false },
    queryFn: async ({ signal }) => {
      const response = await api.post(
        category === 'chat'
          ? '/pg/chat/completions/estimate'
          : '/pg/tasks/estimate',
        JSON.parse(debouncedEstimateKey),
        { signal, skipErrorHandler: true }
      )
      return response.data
    },
    enabled:
      estimateKey === debouncedEstimateKey &&
      estimatePayload !== null &&
      !running &&
      !action.unavailable,
    retry: false,
    staleTime: 10000,
  })
  useEffect(() => {
    if (result) {
      void queryClient.invalidateQueries({ queryKey: ['header-balance'] })
    }
  }, [result, queryClient])
  const currentEstimate =
    estimateKey === debouncedEstimateKey && !estimate.isError
      ? estimate.data
      : undefined
  let estimateLabel = t('Complete the required fields')
  if (estimatePayload) {
    estimateLabel = t('Estimate unavailable')
  }
  if (estimate.isFetching || estimateKey !== debouncedEstimateKey) {
    estimateLabel = t('Calculating…')
  }
  const [startedAt, setStartedAt] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [history, setHistory] = useState<
    Awaited<ReturnType<typeof studioHistory>>
  >([])
  const [historyOpen, setHistoryOpen] = useState(false)
  const [demos, setDemos] = useState<StudioDemo[]>([])
  const [demoId, setDemoId] = useState('')
  const [requestOpen, setRequestOpen] = useState(false)
  const [songs, setSongs] = useState<{ value: string; label: string }[]>([])
  const [songsLoading, setSongsLoading] = useState(false)
  const needsSong = action.fields.some((f) => f.kind === 'song')
  useEffect(() => {
    if (!needsSong) return
    let active = true
    setSongsLoading(true)
    const loadSongs = async () => {
      try {
        const recent = await studioHistory()
        const completed = recent
          .filter(
            (item) =>
              item.status === 'SUCCESS' && item.model.startsWith('suno/')
          )
          .slice(0, 12)
        const results = await Promise.all(
          completed.map(async (item) => {
            const data = await readStudioResult(item.task_id)
            return (data.tracks ?? []).map((track, index) => ({
              value: JSON.stringify([item.task_id, track.id]),
              label:
                track.title ||
                `${t('Song')} ${index + 1} · ${item.task_id.slice(-6)}`,
            }))
          })
        )
        if (active) setSongs(results.flat())
      } catch {
        if (active) setError('Unable to load your songs.')
      } finally {
        if (active) setSongsLoading(false)
      }
    }
    void loadSongs()
    return () => {
      active = false
    }
  }, [needsSong, t])
  const inFlight = useRef(false)
  const userId = useAuthStore((state) => state.auth.user?.id)
  useEffect(() => {
    if (!userId) return
    let active = true
    const saved = sessionStorage.getItem(`studio-task-${userId}`)
    const restore = async () => {
      if (!saved) return
      try {
        const context = saved.startsWith('{')
          ? (JSON.parse(saved) as {
              taskId: string
              modelId: string
              actionId: string
              values: Record<string, string>
            })
          : { taskId: saved }
        const next = await readStudioResult(context.taskId)
        if (!active) return
        if ('modelId' in context) {
          const restoredModel = liveModels.find((m) => m.id === context.modelId)
          if (restoredModel?.actions.some((a) => a.id === context.actionId)) {
            setModelId(restoredModel.id)
            setCategory(restoredModel.category)
            setActionId(context.actionId)
            setValues(context.values)
          }
        }
        setResult(next)
        if (!['SUCCESS', 'FAILURE'].includes(next.status)) {
          setStartedAt(
            (next.created_at ?? Math.floor(Date.now() / 1000)) * 1000
          )
          setRunning(true)
          inFlight.current = true
        }
      } catch {
        if (active) sessionStorage.removeItem(`studio-task-${userId}`)
      }
    }
    void restore()
    return () => {
      active = false
    }
  }, [userId])
  useEffect(() => {
    let active = true
    void getUserModels()
      .then((r) => {
        if (active && r.success) setAvailable(r.data ?? [])
      })
      .catch(() => {
        if (active) setError('Unable to load available models. Please refresh.')
      })
    void fetch('/studio-demos/index.json')
      .then((r) => (r.ok ? r.json() : []))
      .then((r: StudioDemo[]) => {
        if (active) setDemos(r)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])
  useEffect(() => {
    if (!running) return
    const timer = setInterval(
      () => setElapsed(Math.floor((Date.now() - startedAt) / 1000)),
      1000
    )
    return () => clearInterval(timer)
  }, [running, startedAt])
  useEffect(() => {
    if (!running || !result?.task_id) return
    let active = true
    let timer: ReturnType<typeof setTimeout>
    const id = result.task_id
    const poll = async () => {
      try {
        const next = await readStudioResult(id)
        if (!active) return
        setResult(next)
        if (next.status === 'SUCCESS' || next.status === 'FAILURE') {
          setRunning(false)
          inFlight.current = false
          if (next.status === 'FAILURE') {
            setError(
              'Generation failed. Any applicable refund is handled by the system.'
            )
          }
          return
        }
        timer = setTimeout(poll, 4000)
      } catch {
        if (active) {
          setError(
            'Status check interrupted. The task may still be running. Open history to check again.'
          )
          setRunning(false)
          inFlight.current = false
        }
      }
    }
    timer = setTimeout(poll, 1500)
    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [running, result?.task_id])
  const selectAction = (next: LiveAction) => {
    setActionId(next.id)
    setValues({ ...initialValues(next), prompt: examples[category] })
    setError('')
    setResult(null)
    setDemoId('')
  }
  const selectModel = (id: string) => {
    const next = liveModels.find((m) => m.id === id)
    if (!next) return
    setCategory(next.category)
    setModelId(next.id)
    setActionId(next.actions[0].id)
    setValues({
      ...initialValues(next.actions[0]),
      prompt: examples[next.category],
    })
    setError('')
    setResult(null)
    setDemoId('')
    setElapsed(0)
  }
  const run = async () => {
    const start = Date.now()
    if (inFlight.current || action.unavailable) return
    try {
      buildStudioPayload(action, category, values)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid input.')
      return
    }
    inFlight.current = true
    setRunning(true)
    setStartedAt(start)
    setElapsed(0)
    setResult(null)
    setDemoId('')
    setError('')
    try {
      const next = await submitStudio(action, category, values)
      setResult(next)
      if (next.task_id && userId) {
        sessionStorage.setItem(
          `studio-task-${userId}`,
          JSON.stringify({
            taskId: next.task_id,
            modelId,
            actionId: action.id,
            values,
          })
        )
      }
      if (next.status === 'SUCCESS') {
        setElapsed(Math.floor((Date.now() - start) / 1000))
        setRunning(false)
        inFlight.current = false
      }
    } catch (error) {
      setRunning(false)
      inFlight.current = false
      setError(studioSubmissionError(error))
    }
  }
  const demo =
    demos.find((d) => d.id === demoId) ??
    demos.find((d) => d.model === action.endpoint && d.functionId === action.id)
  const shown =
    result ??
    (demo
      ? { status: 'SUCCESS', text: demo.text, artifacts: demo.artifacts }
      : null)
  let request = ''
  try {
    request = JSON.stringify(
      buildStudioPayload(action, category, values),
      null,
      2
    )
  } catch {
    request = t('Complete the required fields to view request parameters.')
  }
  return (
    <div className='studio-page studio-embedded'>
      <header className='studio-heading'>
        <div>
          <div className='studio-eyebrow'>
            <span />
            BEESKYBASE STUDIO
          </div>
          <h1>
            {t('From idea to creation.')}
            <Sparkles size={30} />
          </h1>
          <p>
            {t(
              'Choose a function, describe your idea, and create something real.'
            )}
          </p>
        </div>
        <div className='studio-demo'>
          <Sparkles size={15} />
          <div>
            <strong>{t('Live generation')}</strong>
            <span>{t('Uses your account balance')}</span>
          </div>
        </div>
      </header>
      <div className='studio-topline'>
        <nav className='studio-categories' aria-label={t('Creative category')}>
          {categories.map((item) => (
            <Button
              key={item.id}
              variant='ghost'
              disabled={running}
              aria-pressed={category === item.id}
              className={cn(
                'studio-category',
                category === item.id && 'is-active'
              )}
              onClick={() =>
                selectModel(
                  liveModels.find((m) => m.category === item.id)?.id ?? modelId
                )
              }
            >
              <item.icon size={17} />
              {t(item.label)}
            </Button>
          ))}
        </nav>
        <Button
          variant='ghost'
          aria-expanded={historyOpen}
          onClick={async () => {
            setHistoryOpen(!historyOpen)
            if (!historyOpen) {
              try {
                setHistory(await studioHistory())
              } catch {
                setError('Unable to load task history.')
              }
            }
          }}
        >
          <History size={16} />
          {t('Task history')}
        </Button>
      </div>
      {historyOpen && (
        <div className='studio-live-history'>
          <strong>{t('Your recent tasks')}</strong>
          {history.length === 0 && <p>{t('No tasks yet.')}</p>}
          {history.map((item) => (
            <Button
              key={item.task_id}
              variant='outline'
              disabled={running}
              onClick={async () => {
                try {
                  const next = await readStudioResult(item.task_id)
                  setResult(next)
                  setError('')
                  setDemoId('')
                  if (!['SUCCESS', 'FAILURE'].includes(next.status)) {
                    setStartedAt(Date.now())
                    setRunning(true)
                    inFlight.current = true
                  }
                } catch {
                  setError('Unable to load this result.')
                }
              }}
            >
              {item.model || t('Generation task')} · {t(item.status)}
            </Button>
          ))}
        </div>
      )}
      <div className='studio-workspace'>
        <aside className='studio-models'>
          <div className='studio-panel-heading'>
            <h2>{t('Choose a model')}</h2>
          </div>
          <div className='studio-search'>
            <Search size={15} />
            <Input
              aria-label={t('Search models')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('Search models')}
            />
          </div>
          <div className='studio-model-list'>
            {liveModels
              .filter(
                (m) =>
                  m.category === category &&
                  m.name.toLowerCase().includes(query.toLowerCase())
              )
              .map((item) => {
                let availabilityLabel = 'Checking availability'
                if (item.actions.every((a) => !!a.unavailable)) {
                  availabilityLabel = 'Temporarily unavailable'
                } else if (available?.includes(item.id)) {
                  availabilityLabel = 'Available'
                } else if (available !== null) {
                  availabilityLabel = 'Unavailable'
                }
                return (
                  <Button
                    key={item.id}
                    disabled={
                      running ||
                      (available !== null && !available.includes(item.id))
                    }
                    variant='ghost'
                    className={cn(
                      'studio-model',
                      item.id === modelId && 'is-selected'
                    )}
                    onClick={() => selectModel(item.id)}
                  >
                    <span className='studio-model-icon'>
                      {getLobeIcon(item.icon, 28)}
                    </span>
                    <span>
                      <strong>{item.name}</strong>
                      <small>{t(availabilityLabel)}</small>
                    </span>
                  </Button>
                )
              })}
          </div>
        </aside>
        <section
          className='studio-input-panel'
          aria-label={t('Generation settings')}
        >
          <div className='studio-panel-heading'>
            <h2>{t('Your idea')}</h2>
            <span>{model.name}</span>
          </div>
          <div className='studio-input-content'>
            <div className='studio-section-label'>
              <span>01</span>
              <h3>{t('What would you like to do?')}</h3>
            </div>
            <Select
              value={action.id}
              onValueChange={(id) => {
                const next = model.actions.find((a) => a.id === id)
                if (next) selectAction(next)
              }}
              disabled={running}
            >
              <SelectTrigger
                aria-label={t('Choose a function')}
                className='studio-function-trigger'
              >
                <SelectValue>{t(action.name)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {model.actions.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {t(a.name)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {action.unavailable && (
              <p role='status' className='studio-context-note'>
                {t(action.unavailable)}
              </p>
            )}
            {action.fields.map((field) => (
              <div className='studio-action-field' key={field.key}>
                <Label htmlFor={`live-${field.key}`}>
                  {t(field.label)}
                  {field.required && (
                    <span className='studio-required'> *</span>
                  )}
                </Label>
                {field.kind === 'song' && (
                  <>
                    <Select
                      value={values[field.key] || null}
                      disabled={running || songsLoading}
                      onValueChange={(v) =>
                        setValues((prev) => ({ ...prev, [field.key]: v ?? '' }))
                      }
                    >
                      <SelectTrigger id={`live-${field.key}`}>
                        <SelectValue placeholder={t('Choose a completed song')}>
                          {
                            songs.find(
                              (song) => song.value === values[field.key]
                            )?.label
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {songs.map((song) => (
                          <SelectItem key={song.value} value={song.value}>
                            {song.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {!songsLoading && !songs.length && (
                      <p className='studio-field-hint'>
                        {t(
                          'Create a song first. Only songs from your account can be selected.'
                        )}
                      </p>
                    )}
                  </>
                )}
                {field.kind !== 'song' && field.options && (
                  <Select
                    value={values[field.key] ?? field.value}
                    disabled={running}
                    onValueChange={(v) =>
                      setValues((prev) => ({ ...prev, [field.key]: v ?? '' }))
                    }
                  >
                    <SelectTrigger id={`live-${field.key}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map((v) => (
                        <SelectItem key={v} value={v}>
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {field.kind !== 'song' && !field.options && (
                  <div>
                    {field.kind === 'textarea' || field.kind === 'urls' ? (
                      <Textarea
                        id={`live-${field.key}`}
                        value={values[field.key] ?? ''}
                        disabled={running}
                        maxLength={field.maxLength ?? 5000}
                        onChange={(e) =>
                          setValues((prev) => ({
                            ...prev,
                            [field.key]: e.target.value,
                          }))
                        }
                        className={
                          field.key === 'prompt' ? 'studio-prompt' : undefined
                        }
                      />
                    ) : (
                      <Input
                        id={`live-${field.key}`}
                        type={field.kind === 'number' ? 'number' : 'text'}
                        min={field.min}
                        max={field.max}
                        maxLength={field.maxLength}
                        disabled={running}
                        value={values[field.key] ?? ''}
                        placeholder={
                          field.kind === 'url' ? 'https://…' : undefined
                        }
                        onChange={(e) =>
                          setValues((prev) => ({
                            ...prev,
                            [field.key]: e.target.value,
                          }))
                        }
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
            {action.fields.some(
              (f) => f.kind === 'url' || f.kind === 'urls'
            ) && (
              <p className='studio-field-hint'>
                {t(
                  'Use a public HTTPS link that the generation service can download. Files on your device are not uploaded automatically.'
                )}
              </p>
            )}
            {error && (
              <p className='studio-form-error' role='alert'>
                {t(error)}
              </p>
            )}
          </div>
          <div className='studio-run-area'>
            <div className='studio-estimate'>
              <span>{t('Estimated cost')}</span>
              <strong aria-live='polite'>
                {currentEstimate
                  ? `≈ ${formatQuotaWithCurrency(currentEstimate.quota, { locale, abbreviate: false })}`
                  : estimateLabel}
              </strong>
            </div>
            <Button
              className='studio-run'
              disabled={
                running ||
                !!action.unavailable ||
                !available?.includes(action.endpoint)
              }
              onClick={run}
            >
              {running ? (
                <LoaderCircle size={18} className='animate-spin' />
              ) : (
                <Sparkles size={18} />
              )}{' '}
              {t(running ? 'Generating…' : 'Generate now')}
              {currentEstimate && (
                <span className='tabular-nums'>
                  ≈{' '}
                  {formatQuotaWithCurrency(currentEstimate.quota, {
                    locale,
                    abbreviate: false,
                  })}
                </span>
              )}
              <ArrowRight size={17} />
            </Button>
            {category === 'chat' && (
              <p>
                {t(
                  'Estimate includes up to 1,024 answer tokens. Final charge depends on actual usage.'
                )}
              </p>
            )}
            <p>{t('1 USD = 1,000 credits · 1 credit = 26 VND')}</p>
            <p>
              {t(
                'Generation uses your balance. Leaving this page does not cancel an accepted task.'
              )}
            </p>
          </div>
        </section>
        <section className='studio-output-panel' aria-label={t('Result')}>
          <div className='studio-panel-heading'>
            <h2>{t('Result')}</h2>
            <span className='studio-result-status'>
              {t(running ? 'Processing' : (result?.status ?? 'Real examples'))}
            </span>
          </div>
          <div className='studio-output-tabs'>
            <Button
              variant='ghost'
              onClick={() => setRequestOpen(false)}
              aria-pressed={!requestOpen}
            >
              {t('Preview')}
            </Button>
            <Button
              variant='ghost'
              onClick={() => setRequestOpen(true)}
              aria-pressed={requestOpen}
            >
              {t('Parameters')}
            </Button>
          </div>
          <div className='studio-result-body' aria-live='polite'>
            {requestOpen ? (
              <div className='studio-request'>
                <CopyButton value={request} />
                <pre>{request}</pre>
              </div>
            ) : (
              <>
                {!result && demo && (
                  <div className='studio-result-caption'>
                    <span className='studio-sample-label'>
                      {t('REAL API DEMO')}
                    </span>
                    <h3>{demo.title}</h3>
                    <p>{demo.prompt}</p>
                    <Button
                      variant='outline'
                      disabled={running}
                      onClick={() =>
                        setValues((prev) => ({ ...prev, prompt: demo.prompt }))
                      }
                    >
                      {t('Use this prompt')}
                    </Button>
                  </div>
                )}
                {running && (
                  <div className='studio-live-wait'>
                    <LoaderCircle className='animate-spin' size={28} />
                    <strong>{t('Creating your result…')}</strong>
                    <p>
                      {t(
                        'Media generation can take several minutes. Your task is saved in history.'
                      )}
                    </p>
                    <span>
                      {elapsed}s ·{' '}
                      {result?.progress || t('Waiting for confirmation')}
                    </span>
                  </div>
                )}
                {shown && <ResultMedia result={shown} />}{' '}
                {!shown && !running && (
                  <div className='studio-result-caption'>
                    <Sparkles size={36} />
                    <h3>{t('Your next creation starts here.')}</h3>
                    <p>
                      {t(
                        'Generated images, videos, music and answers appear here. Only verified API outputs are shown as demos.'
                      )}
                    </p>
                  </div>
                )}
                {result && (
                  <div className='studio-result-meta'>
                    <div>
                      <Clock3 size={15} />
                      <span>{t('Elapsed time')}</span>
                      <strong>
                        {result.finished_at && result.created_at
                          ? Math.max(0, result.finished_at - result.created_at)
                          : elapsed}
                        s
                      </strong>
                    </div>
                    <div>
                      <Sparkles size={15} />
                      <span>
                        {t(
                          result.status === 'SUCCESS'
                            ? 'Final charge'
                            : 'Reserved amount'
                        )}
                      </span>
                      <strong>
                        {result.quota === undefined
                          ? t('See usage logs')
                          : formatQuotaWithCurrency(result.quota, { locale })}
                      </strong>
                    </div>
                  </div>
                )}
                {!result && demos.some((d) => d.model === action.endpoint) && (
                  <div className='studio-live-gallery'>
                    {demos
                      .filter((d) => d.model === action.endpoint)
                      .map((d) => (
                        <Button
                          key={d.id}
                          variant='outline'
                          onClick={() => setDemoId(d.id)}
                        >
                          {d.title}
                        </Button>
                      ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
