import {
  BookOpen,
  ArrowRight,
  KeyRound,
  Wallet,
  Code2,
  CircleHelp,
  Sparkles,
  Search,
  ShieldCheck,
} from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CopyButton } from '@/components/copy-button'
import { PublicLayout } from '@/components/layout'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  visibleLiveModels,
  type StudioCategory,
} from '@/features/playground-preview/live-catalog'
import { cn } from '@/lib/utils'

import {
  API_ORIGIN,
  documentationPayload,
  documentationExamples,
} from './examples'

import './style.css'

const groups: { id: StudioCategory; label: string }[] = [
  { id: 'chat', label: 'Chat' },
  { id: 'image', label: 'Images' },
  { id: 'video', label: 'Video' },
  { id: 'audio', label: 'Audio' },
  { id: 'tools', label: 'Tools' },
]
const guides = [
  { id: 'start', label: 'Quick start', icon: BookOpen },
  { id: 'api', label: 'API reference', icon: Code2 },
  { id: 'keys', label: 'API keys', icon: KeyRound },
  { id: 'credits', label: 'Credits and payments', icon: Wallet },
  { id: 'errors', label: 'Troubleshooting', icon: CircleHelp },
]
function CodeBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className='beesky-doc-code'>
      <div className='beesky-doc-code-heading'>
        <span>{label}</span>
        <CopyButton value={value} />
      </div>
      <pre>
        <code>{value}</code>
      </pre>
    </div>
  )
}
export function Documentation() {
  const { t } = useTranslation()
  const initialModel = visibleLiveModels.find(
    (m) => m.id === new URLSearchParams(window.location.search).get('model')
  )
  const [section, setSection] = useState(initialModel ? 'api' : 'start')
  const [modelId, setModelId] = useState(
    initialModel?.id ??
      (
        visibleLiveModels.find((m) => m.category === 'chat') ??
        visibleLiveModels[0]
      ).id
  )
  const model =
    visibleLiveModels.find((m) => m.id === modelId) ?? visibleLiveModels[0]
  const [actionId, setActionId] = useState(model.actions[0].id)
  const action =
    model.actions.find((a) => a.id === actionId) ?? model.actions[0]
  const [search, setSearch] = useState('')
  const payload = documentationPayload(action, model.category)
  const chat = model.category === 'chat'
  const examples = documentationExamples(payload, chat)
  const firstChat =
    visibleLiveModels.find((m) => m.category === 'chat') ?? visibleLiveModels[0]
  const quickStart = documentationExamples(
    documentationPayload(firstChat.actions[0], 'chat'),
    true
  )
  const selectModel = (id: string) => {
    const next = visibleLiveModels.find((m) => m.id === id)
    if (!next) return
    setModelId(id)
    setActionId(next.actions[0].id)
    setSection('api')
    window.history.replaceState(
      null,
      '',
      `/docs?model=${encodeURIComponent(id)}`
    )
  }
  const chooseGuide = (id: string) => {
    setSection(id)
    window.history.replaceState(null, '', '/docs')
  }
  return (
    <PublicLayout showMainContainer={false}>
      <div className='beesky-doc-shell'>
        <aside
          className='beesky-doc-sidebar'
          aria-label={t('Documentation navigation')}
        >
          <a href='/docs' className='beesky-doc-wordmark'>
            <BookOpen aria-hidden='true' />
            <span>
              BeeskyBase <strong>Docs</strong>
            </span>
          </a>
          <div className='beesky-doc-search'>
            <Search aria-hidden='true' />
            <Input
              aria-label={t('Search documentation models')}
              placeholder={t('Search models')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <nav aria-label={t('Guides')} className='beesky-doc-guides'>
            {guides.map((g) => (
              <Button
                key={g.id}
                variant={section === g.id ? 'secondary' : 'ghost'}
                aria-current={section === g.id ? 'page' : undefined}
                onClick={() => chooseGuide(g.id)}
              >
                <g.icon aria-hidden='true' data-icon='inline-start' />
                {t(g.label)}
              </Button>
            ))}
          </nav>
          <div className='beesky-doc-model-nav'>
            {groups.map((group) => {
              const models = visibleLiveModels.filter(
                (m) =>
                  m.category === group.id &&
                  `${m.name} ${m.id}`
                    .toLowerCase()
                    .includes(search.toLowerCase())
              )
              return (
                models.length > 0 && (
                  <div key={group.id}>
                    <h2>{t(group.label)}</h2>
                    {models.map((m) => (
                      <Button
                        key={m.id}
                        variant='ghost'
                        aria-current={
                          section === 'api' && modelId === m.id
                            ? 'page'
                            : undefined
                        }
                        className={cn(
                          'beesky-doc-model-link',
                          section === 'api' && modelId === m.id && 'is-current'
                        )}
                        onClick={() => selectModel(m.id)}
                      >
                        {m.name}
                      </Button>
                    ))}
                  </div>
                )
              )
            })}
            {search &&
              !visibleLiveModels.some((m) =>
                `${m.name} ${m.id}`.toLowerCase().includes(search.toLowerCase())
              ) && <p>{t('No matching models')}</p>}
          </div>
          <a
            href='/playground'
            className={buttonVariants({ variant: 'outline' })}
          >
            {t('Try in Studio')}
            <ArrowRight data-icon='inline-end' />
          </a>
        </aside>
        <main id='documentation-content' className='beesky-doc-main'>
          <div className='beesky-doc-breadcrumb'>
            BeeskyBase <span>/</span>{' '}
            {t(guides.find((g) => g.id === section)?.label ?? 'API reference')}
          </div>
          {section === 'start' && (
            <>
              <Badge variant='secondary'>{t('BUILD WITH BEESKYBASE')}</Badge>
              <h1>{t('Your first API call, made simple.')}</h1>
              <p className='beesky-doc-lead'>
                {t(
                  'One account for chat, images, video and music. Choose a model, copy an example, and start building.'
                )}
              </p>
              <div className='beesky-doc-step-grid'>
                {[
                  {
                    n: '01',
                    title: 'Create an API key',
                    text: 'Open API Keys and create a key for your application.',
                    href: '/keys',
                    icon: KeyRound,
                  },
                  {
                    n: '02',
                    title: 'Add credits',
                    text: 'Top up with MB Bank. Your balance updates after payment confirmation.',
                    href: '/wallet',
                    icon: Wallet,
                  },
                  {
                    n: '03',
                    title: 'Choose a model',
                    text: 'Explore verified functions and view the expected cost before generating.',
                    href: '/playground',
                    icon: Sparkles,
                  },
                ].map((step) => (
                  <Card key={step.n}>
                    <CardHeader>
                      <div className='beesky-doc-step-top'>
                        <step.icon aria-hidden='true' />
                        <span>{step.n}</span>
                      </div>
                      <CardTitle>{t(step.title)}</CardTitle>
                      <CardDescription>{t(step.text)}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <a href={step.href} className='beesky-doc-text-link'>
                        {t('Open')}
                        <ArrowRight size={15} />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <h2>{t('Connect to BeeskyBase')}</h2>
              <p>
                {t(
                  'Use this base URL with applications that support the OpenAI API format.'
                )}
              </p>
              <CodeBlock label='Base URL' value={`${API_ORIGIN}/v1`} />
              <Alert>
                <ShieldCheck aria-hidden='true' />
                <AlertTitle>{t('Keep your key on the server')}</AlertTitle>
                <AlertDescription>
                  {t(
                    'Store the key in an environment variable. Never put a real key in public frontend code, screenshots or a repository.'
                  )}
                </AlertDescription>
              </Alert>
              <h2>{t('A minimal chat request')}</h2>
              <p>
                {t(
                  'Code samples use Bash, Node.js 18+ or Python with the requests package.'
                )}
              </p>
              <CodeBlock label='cURL' value={quickStart.curl} />
              <Button onClick={() => setSection('api')}>
                {t('Explore the API reference')}
                <ArrowRight data-icon='inline-end' />
              </Button>
            </>
          )}
          {section === 'api' && (
            <>
              <div className='beesky-doc-title-row'>
                <Badge variant='secondary'>
                  {t(
                    groups.find((g) => g.id === model.category)?.label ??
                      'Models'
                  )}
                </Badge>
                <a
                  href='/playground'
                  className={buttonVariants({ variant: 'outline', size: 'sm' })}
                >
                  {t('Try in Studio')}
                  <ArrowRight data-icon='inline-end' />
                </a>
              </div>
              <h1>{model.name}</h1>
              <p className='beesky-doc-lead'>
                {t(
                  'Select a function to see its parameters and ready-to-copy code.'
                )}
              </p>
              <div className='beesky-doc-function'>
                <Label htmlFor='doc-function'>{t('Function')}</Label>
                <Select
                  value={action.id}
                  onValueChange={(v) => {
                    if (v) setActionId(v)
                  }}
                >
                  <SelectTrigger id='doc-function'>
                    <SelectValue>{t(action.name)}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {model.actions.map((a) => (
                        <SelectItem key={a.id} value={a.id}>
                          {t(a.name)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className='beesky-doc-endpoint'>
                <Badge>POST</Badge>
                <code>{chat ? '/v1/chat/completions' : '/v1/media/tasks'}</code>
              </div>
              <p>
                {t(
                  chat
                    ? 'Chat returns an answer in the same request.'
                    : 'Media generation returns a task ID. Poll for its status, then retrieve the output files.'
                )}
              </p>
              <Tabs defaultValue='curl'>
                <TabsList aria-label={t('Code language')}>
                  <TabsTrigger value='curl'>cURL</TabsTrigger>
                  <TabsTrigger value='javascript'>JavaScript</TabsTrigger>
                  <TabsTrigger value='python'>Python</TabsTrigger>
                </TabsList>
                {Object.entries(examples).map(([lang, value]) => (
                  <TabsContent key={lang} value={lang}>
                    <CodeBlock
                      label={lang === 'curl' ? 'cURL' : lang}
                      value={value}
                    />
                  </TabsContent>
                ))}
              </Tabs>
              <h2>{t('Request parameters')}</h2>
              <p>
                {t(
                  'model identifies the selected function. Media parameters belong inside input; chat uses messages.'
                )}
              </p>
              <div className='beesky-doc-table-wrap'>
                <table>
                  <thead>
                    <tr>
                      <th>{t('Parameter')}</th>
                      <th>{t('Description')}</th>
                      <th>{t('Accepted values')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <code>model</code>
                        <Badge variant='outline'>{t('Required')}</Badge>
                      </td>
                      <td>{t('Model ID')}</td>
                      <td>
                        <code>{action.endpoint}</code>
                      </td>
                    </tr>
                    {action.fields.map((f) => {
                      let accepted = t('Text')
                      if (f.kind === 'url' || f.kind === 'urls') {
                        accepted = t('Public HTTPS URL')
                      }
                      if (f.kind === 'song') {
                        accepted = t('Your completed song')
                      }
                      if (f.maxLength) {
                        accepted = `${t('Maximum')} ${f.maxLength} ${t('characters')}`
                      }
                      if (f.kind === 'number') {
                        accepted = `${f.min ?? 0}–${f.max ?? 3600}`
                      }
                      if (f.options) {
                        accepted = f.options.join(' · ')
                      }
                      return (
                        <tr key={f.key}>
                          <td>
                            <code>
                              {chat && f.key === 'prompt'
                                ? 'messages[].content'
                                : `input.${f.kind === 'song' ? 'taskId / audioId' : f.key}`}
                            </code>
                            {f.required && (
                              <Badge variant='outline'>{t('Required')}</Badge>
                            )}
                          </td>
                          <td>
                            {t(f.label)}
                            {f.kind === 'song' && (
                              <p>
                                {t(
                                  'Use the task ID and track ID from one of your completed songs.'
                                )}
                              </p>
                            )}
                          </td>
                          <td>{accepted}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <Alert>
                <CircleHelp aria-hidden='true' />
                <AlertTitle>{t('Examples contain placeholders')}</AlertTitle>
                <AlertDescription>
                  {t(
                    'Replace YOUR_TASK_ID, YOUR_TRACK_ID and example.com file URLs with your own values. Keep the API key in BEESKYBASE_API_KEY.'
                  )}
                </AlertDescription>
              </Alert>
              {!chat && (
                <>
                  <h2>{t('Get the result')}</h2>
                  <p>
                    {t(
                      'Keep task_id from the submit response. Check status every 3–5 seconds; do not submit the same paid request repeatedly.'
                    )}
                  </p>
                  <CodeBlock
                    label='1 · Status'
                    value={`curl "${API_ORIGIN}/v1/media/tasks/YOUR_TASK_ID" -H "Authorization: Bearer $BEESKYBASE_API_KEY"`}
                  />
                  <div className='beesky-doc-statuses'>
                    {[
                      'SUBMITTED',
                      'QUEUED',
                      'IN_PROGRESS',
                      'SUCCESS',
                      'FAILURE',
                    ].map((status) => (
                      <Badge key={status} variant='outline'>
                        {status}
                      </Badge>
                    ))}
                  </div>
                  <p>
                    {t(
                      'On SUCCESS, list the artifacts. Each artifact includes type and content_url; use content_url to retrieve the file. Lyrics and text appear in the status response text field. Music tracks also include IDs for follow-up functions.'
                    )}
                  </p>
                  <CodeBlock
                    label='2 · Output files'
                    value={`curl "${API_ORIGIN}/v1/media/tasks/YOUR_TASK_ID/artifacts" -H "Authorization: Bearer $BEESKYBASE_API_KEY"`}
                  />
                </>
              )}
              <h2>{t('Pricing')}</h2>
              <p>
                {t(
                  'Prices vary by model and selected settings. Studio shows an estimate before you run; usage history records the actual charge.'
                )}
              </p>
              <a href='/pricing' className='beesky-doc-text-link'>
                {t('View model pricing')}
                <ArrowRight size={15} />
              </a>
            </>
          )}
          {section === 'keys' && (
            <>
              <Badge variant='secondary'>
                <KeyRound data-icon='inline-start' />
                {t('Authentication')}
              </Badge>
              <h1>{t('API keys')}</h1>
              <p className='beesky-doc-lead'>
                {t(
                  'Your application authenticates with a BeeskyBase API key in the Authorization header.'
                )}
              </p>
              <CodeBlock
                label='HTTP header'
                value='Authorization: Bearer YOUR_BEESKYBASE_API_KEY'
              />
              <h2>{t('Create and manage keys')}</h2>
              <ol className='beesky-doc-list'>
                <li>{t('Open API Keys in your account.')}</li>
                <li>
                  {t(
                    'Create a dedicated key for each application and set a spending limit.'
                  )}
                </li>
                <li>
                  {t('Copy the key into BEESKYBASE_API_KEY on your server.')}
                </li>
                <li>{t('Revoke a key immediately if it has been exposed.')}</li>
              </ol>
              <a href='/keys' className={buttonVariants()}>
                {t('Open API Keys')}
                <ArrowRight data-icon='inline-end' />
              </a>
              <Alert>
                <ShieldCheck aria-hidden='true' />
                <AlertTitle>{t('Keep your key on the server')}</AlertTitle>
                <AlertDescription>
                  {t(
                    'Store the key in an environment variable. Never put a real key in public frontend code, screenshots or a repository.'
                  )}
                </AlertDescription>
              </Alert>
              <h2>{t('List available models')}</h2>
              <CodeBlock
                label='GET /v1/models'
                value={`curl "${API_ORIGIN}/v1/models" -H "Authorization: Bearer $BEESKYBASE_API_KEY"`}
              />
            </>
          )}
          {section === 'credits' && (
            <>
              <Badge variant='secondary'>{t('BILLING')}</Badge>
              <h1>{t('Credits and payments')}</h1>
              <p className='beesky-doc-lead'>
                {t('A single balance for every model you use.')}
              </p>
              <Card>
                <CardHeader>
                  <CardTitle>1 USD = 1.000 credit</CardTitle>
                  <CardDescription>
                    {t(
                      'At the current MB Bank top-up rate: 1 credit = 26 VND.'
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='beesky-doc-credit-example'>
                    <span>26.000 VNĐ</span>
                    <ArrowRight aria-hidden='true' />
                    <strong>1.000 credit</strong>
                  </div>
                </CardContent>
              </Card>
              <h2>{t('Top up with MB Bank')}</h2>
              <ol className='beesky-doc-list'>
                <li>{t('Open Wallet and choose MB Bank.')}</li>
                <li>
                  {t(
                    'Create a payment QR and transfer the exact amount with the generated transfer description.'
                  )}
                </li>
                <li>
                  {t(
                    'Wait for payment confirmation. Your credit balance updates automatically.'
                  )}
                </li>
              </ol>
              <a href='/wallet' className={buttonVariants()}>
                {t('Open Wallet')}
                <ArrowRight data-icon='inline-end' />
              </a>
              <h2>{t('How charges work')}</h2>
              <p>
                {t(
                  'Chat is charged for actual token usage. Media may be charged per generation, image, duration or other selected parameters. The unit and selling price are shown in the model catalogue.'
                )}
              </p>
              <p>
                {t(
                  'An estimated amount may be reserved when a task starts. The system settles the final charge after completion; any applicable refund appears in your balance.'
                )}
              </p>
              <a href='/pricing' className='beesky-doc-text-link'>
                {t('View model pricing')}
                <ArrowRight size={15} />
              </a>
            </>
          )}
          {section === 'errors' && (
            <>
              <Badge variant='secondary'>{t('HELP')}</Badge>
              <h1>{t('Troubleshooting')}</h1>
              <p className='beesky-doc-lead'>
                {t('Check the status code before retrying a request.')}
              </p>
              <div className='beesky-doc-table-wrap'>
                <table>
                  <thead>
                    <tr>
                      <th>HTTP</th>
                      <th>{t('What to check')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [
                        '400',
                        'Check required parameters, supported options and file URLs.',
                      ],
                      [
                        '401',
                        'Check your API key and the Bearer authorization header.',
                      ],
                      [
                        '403',
                        'Check key permissions, model access and IP restrictions.',
                      ],
                      [
                        '402 / 403',
                        'Check your account balance and the spending limit of the key.',
                      ],
                      [
                        '429',
                        'Reduce concurrent requests and retry after a short delay.',
                      ],
                      [
                        '5xx',
                        'The service is temporarily unavailable. Check task history before resubmitting a media request.',
                      ],
                    ].map(([status, text]) => (
                      <tr key={status}>
                        <td>
                          <code>{status}</code>
                        </td>
                        <td>{t(text)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h2>{t('A task is still processing')}</h2>
              <p>
                {t(
                  'Media generation can take several minutes. Keep the task ID and poll its status. Closing the page does not cancel an accepted task.'
                )}
              </p>
              <h2>{t('Payment has not appeared')}</h2>
              <p>
                {t(
                  'Check the amount, transfer description and order expiry. Keep your bank receipt and order code when contacting support; do not pay again for the same order.'
                )}
              </p>
              <h2>{t('Files cannot be read')}</h2>
              <p>
                {t(
                  'Use a public HTTPS URL that can be downloaded without login. Replace all example.com placeholders before making a real request.'
                )}
              </p>
            </>
          )}
          <footer className='beesky-doc-footer'>
            <span>BeeskyBase · {t('Developer documentation')}</span>
            <a href='/playground'>
              {t('Try in Studio')} <ArrowRight size={14} />
            </a>
          </footer>
        </main>
      </div>
    </PublicLayout>
  )
}
