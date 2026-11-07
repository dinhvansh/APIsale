import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  Code2,
  Film,
  History,
  Image,
  LoaderCircle,
  MessageSquare,
  Music2,
  Play,
  RotateCcw,
  Search,
  Sparkles,
  WandSparkles,
  Wrench,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CopyButton } from '@/components/copy-button'
import { PublicLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getLobeIcon } from '@/lib/lobe-icon'
import { cn } from '@/lib/utils'

import { getStudioFunctions } from './function-catalog'
import { FunctionFields, FunctionOutput, FunctionPicker } from './functions'
import { LivePlayground } from './live'

import './preview.css'

type Category = 'video' | 'image' | 'chat' | 'audio' | 'tools'
type DemoModel = {
  id: string
  name: string
  brand: string
  icon: string
  category: Category
  note: string
  badge?: string
}
const categories = [
  { id: 'video', label: 'Video', icon: Film },
  { id: 'image', label: 'Hình ảnh', icon: Image },
  { id: 'chat', label: 'Trò chuyện', icon: MessageSquare },
  { id: 'audio', label: 'Âm thanh', icon: Music2 },
  { id: 'tools', label: 'Công cụ', icon: Wrench },
] as const
const models: DemoModel[] = [
  {
    id: 'bytedance/seedance-2-mini',
    name: 'Seedance 2 Mini',
    brand: 'ByteDance',
    icon: 'ByteDance.Color',
    category: 'video',
    note: 'Biến ý tưởng thành thước phim',
    badge: 'Nổi bật',
  },
  {
    id: 'google/veo-3-1-fast',
    name: 'Veo 3.1 Fast',
    brand: 'Google',
    icon: 'Gemini.Color',
    category: 'video',
    note: 'Video sống động, có âm thanh',
  },
  {
    id: 'kling/video',
    name: 'Kling Video',
    brand: 'Kling',
    icon: 'Kling.Color',
    category: 'video',
    note: 'Chuyển động tự nhiên, giàu chi tiết',
  },
  {
    id: 'openai/gpt-image-2',
    name: 'GPT Image 2',
    brand: 'OpenAI',
    icon: 'OpenAI',
    category: 'image',
    note: 'Tạo ảnh từ mô tả của bạn',
  },
  {
    id: 'google/nano-banana-2',
    name: 'Nano Banana 2',
    brand: 'Google',
    icon: 'Gemini.Color',
    category: 'image',
    note: 'Sáng tạo và chỉnh sửa hình ảnh',
  },
  {
    id: 'claude-haiku-5-5',
    name: 'Claude Haiku 5.5',
    brand: 'Anthropic',
    icon: 'Claude.Color',
    category: 'chat',
    note: 'Trợ lý nhanh cho công việc hằng ngày',
    badge: 'Mới',
  },
  {
    id: 'claude-sonnet-5',
    name: 'Claude Sonnet 5',
    brand: 'Anthropic',
    icon: 'Claude.Color',
    category: 'chat',
    note: 'Viết nội dung, phân tích và lập trình',
  },
  {
    id: 'suno/generate',
    name: 'Suno Music',
    brand: 'Suno',
    icon: 'Suno',
    category: 'audio',
    note: 'Sáng tác, biến đổi và xử lý âm nhạc',
  },
  {
    id: 'beesky/image-watermark-remove',
    name: 'Xử lý hình ảnh',
    brand: 'BeeskyBase',
    icon: 'BeeskyBase',
    category: 'tools',
    note: 'Làm sạch ảnh bạn có quyền chỉnh sửa',
  },
]
const prompts: Record<Category, string> = {
  video:
    'Một căn nhà gỗ nhỏ bên hồ vào buổi sáng. Sương mỏng lướt trên mặt nước, ánh nắng xuyên qua rừng thông. Máy quay tiến chậm về phía căn nhà, phong cách điện ảnh, màu sắc tự nhiên.',
  image:
    'Một căn nhà gỗ bên hồ giữa rừng thông, ánh nắng ban mai, sương mỏng trên mặt nước. Ảnh phong cách điện ảnh, tông xanh trầm và ánh sáng vàng ấm.',
  chat: 'Viết giúp mình 3 ý tưởng nội dung giới thiệu một homestay bên hồ. Giọng văn gần gũi, mỗi ý tưởng có tiêu đề và một đoạn mô tả ngắn.',
  audio:
    'Một bản nhạc không lời nhẹ nhàng cho buổi sáng bên hồ. Piano ấm áp, guitar acoustic và tiếng thiên nhiên, mang cảm giác bình yên.',
  tools:
    'Giữ lại màu sắc và chi tiết tự nhiên của ảnh, làm sạch các chi tiết thừa trên ảnh mình sở hữu.',
}
const inspiration: Record<Category, string[]> = {
  video: ['Phong cảnh điện ảnh', 'Quảng cáo sản phẩm', 'Câu chuyện ngắn'],
  image: ['Ảnh sản phẩm', 'Minh họa sáng tạo', 'Không gian kiến trúc'],
  chat: ['Viết nội dung', 'Giải thích dễ hiểu', 'Lên ý tưởng'],
  audio: ['Nhạc thư giãn', 'Nhạc quảng cáo', 'Giai điệu vui tươi'],
  tools: ['Làm sạch hình ảnh', 'Giữ chi tiết gốc'],
}

function Choices(props: {
  label: string
  values: string[]
  value: string
  onChange: (value: string) => void
}) {
  const { t } = useTranslation()
  return (
    <fieldset className='studio-field'>
      <legend>{t(props.label)}</legend>
      <div className='studio-choices'>
        {props.values.map((value) => (
          <Button
            key={value}
            variant='outline'
            aria-pressed={props.value === value}
            className={cn(
              'studio-choice',
              props.value === value && 'is-selected'
            )}
            onClick={() => props.onChange(value)}
          >
            {value}
          </Button>
        ))}
      </div>
    </fieldset>
  )
}

function Landscape() {
  return (
    <svg
      viewBox='0 0 800 500'
      className='studio-landscape'
      role='img'
      aria-label='Minh họa mẫu căn nhà bên hồ giữa rừng thông'
    >
      <defs>
        <linearGradient id='sky' x2='0' y2='1'>
          <stop stopColor='#c9d8c9' />
          <stop offset='1' stopColor='#f8e7bb' />
        </linearGradient>
        <linearGradient id='lake' x2='0' y2='1'>
          <stop stopColor='#8ea995' />
          <stop offset='1' stopColor='#324f4b' />
        </linearGradient>
        <radialGradient id='sunlight'>
          <stop stopColor='#fff1c5' stopOpacity='.8' />
          <stop offset='1' stopColor='#fff1c5' stopOpacity='0' />
        </radialGradient>
      </defs>
      <path fill='url(#sky)' d='M0 0h800v500H0z' />
      <circle fill='url(#sunlight)' cx='580' cy='120' r='230' />
      <circle fill='#fff0bd' cx='581' cy='102' r='35' />
      <path
        fill='#92a99c'
        d='M0 205 108 78 235 207 362 101 498 218 632 130 800 225V360H0z'
      />
      <path
        fill='#687f73'
        d='M0 228 139 148 289 267 434 165 561 254 734 161 800 197V350H0z'
      />
      <path fill='url(#lake)' d='M0 288h800v212H0z' />
      <path
        fill='#2c4941'
        d='M0 190 68 242 145 230 225 285 324 301 265 328 100 346 0 319zm800-20-70 47-65 35-95 38 62 40 168 2z'
      />
      {[15, 49, 83, 115, 154, 198, 668, 713, 758, 790].map((x, i) => (
        <g key={x} fill={i % 2 ? '#2e4c41' : '#3b5a4b'}>
          <path d={`M${x} ${165 + (i % 3) * 18}l-31 97h62z`} />
          <path d={`M${x} ${139 + (i % 3) * 18}l-24 79h48z`} />
          <path d={`M${x - 3} 245h6v52h-6z`} />
        </g>
      ))}
      <path fill='#80654b' d='M346 253h136v70H346z' />
      <path fill='#343e35' d='m330 256 84-59 86 59z' />
      <path fill='#c0a37a' d='M414 213v110h68v-68z' />
      <path fill='#f8d48a' d='M365 269h27v29h-27zm65-5h30v31h-30z' />
      <path fill='#4b4a38' d='M402 281h16v42h-16z' />
      <path stroke='#d8c19a' strokeWidth='5' d='M331 326h173' />
      <g stroke='#d9ddbb' fill='none' opacity='.4'>
        <path d='M271 348h275M320 367h169M194 394h360M366 420h210M103 452h310' />
      </g>
      <path fill='#f1e9c9' opacity='.25' d='m430 337 25 0 34 134h-92z' />
    </svg>
  )
}

function StaticPlaygroundPreview(props: { embedded?: boolean }) {
  const { t } = useTranslation()
  const [category, setCategory] = useState<Category>('video')
  const [model, setModel] = useState(models[0])
  const [functionId, setFunctionId] = useState('text-video')
  const [functionValues, setFunctionValues] = useState<Record<string, string>>(
    {}
  )
  const functions = getStudioFunctions(model)
  const action =
    functions.find((item) => item.id === functionId) ?? functions[0]
  const [query, setQuery] = useState('')
  const [prompt, setPrompt] = useState(prompts.video)
  const [resolution, setResolution] = useState('720p')
  const [duration, setDuration] = useState('5 giây')
  const [ratio, setRatio] = useState('16:9')
  const [genre, setGenre] = useState('Acoustic')
  const [sound, setSound] = useState(true)
  const [phase, setPhase] = useState<'idle' | 'running' | 'done'>('idle')
  const [outputTab, setOutputTab] = useState<'preview' | 'request'>('preview')
  const [history, setHistory] = useState<
    {
      id: number
      name: string
      prompt: string
      model: DemoModel
      functionId: string
      values: Record<string, string>
    }[]
  >([])
  const [historyOpen, setHistoryOpen] = useState(false)
  const [validation, setValidation] = useState('')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    []
  )
  const stop = () => {
    if (timer.current) clearTimeout(timer.current)
    setPhase('idle')
  }
  const selectModel = (next: DemoModel) => {
    stop()
    setModel(next)
    setCategory(next.category)
    setPrompt(prompts[next.category])
    setValidation('')
    setFunctionId(getStudioFunctions(next)[0].id)
    setFunctionValues({})
  }
  const applyExample = () => {
    setPrompt(prompts[category])
    setFunctionValues((previous) => ({
      ...previous,
      ...Object.fromEntries(
        action.fields
          .filter((field) => field.kind !== 'image' && field.kind !== 'audio')
          .map((field) => {
            let value = 'Acoustic, piano ấm áp, cảm xúc bình yên'
            if (field.key === 'title') value = 'Một sớm bình yên'
            if (field.key === 'song') value = 'demo-morning'
            if (field.key === 'continueAt') value = '30'
            if (field.key === 'prompt') {
              value =
                'Một bài hát acoustic tiếng Việt về tuổi trẻ và những chuyến đi.'
            }
            if (field.key === 'lyrics') {
              value =
                '[Verse]\nNắng thức giấc trên con đường quen thuộc\nTa mang theo một khoảng trời xanh\n\n[Chorus]\nCùng nhau đi qua những mùa tuổi trẻ'
            }
            return [field.key, value]
          })
      ),
    }))
    setValidation('')
  }
  const selectCategory = (next: Category) => {
    setQuery('')
    selectModel(models.find((item) => item.category === next) ?? models[0])
  }
  const simulate = () => {
    const missing = action.fields.find(
      (field) => field.required && !functionValues[field.key]?.trim()
    )
    if (missing) {
      setValidation(`${t('Vui lòng bổ sung:')} ${t(missing.label)}`)
      return
    }
    if (category !== 'audio' && !prompt.trim()) {
      setValidation('Bạn hãy nhập mô tả trước nhé.')
      return
    }
    setValidation('')
    setOutputTab('preview')
    setPhase('running')
    timer.current = setTimeout(() => {
      setPhase('done')
      setHistory((previous) =>
        [
          {
            id: Date.now(),
            name: `${model.name} · ${action.name}`,
            prompt,
            model,
            functionId: action.id,
            values: { ...functionValues },
          },
          ...previous,
        ].slice(0, 8)
      )
    }, 1800)
  }
  const modelList = models.filter(
    (item) =>
      item.category === category &&
      `${item.name} ${item.brand}`.toLowerCase().includes(query.toLowerCase())
  )
  const request = JSON.stringify(
    {
      model: action.endpoint,
      function: action.name,
      ...(category === 'audio'
        ? functionValues
        : { prompt, ...functionValues }),
      ...(category === 'video'
        ? {
            resolution,
            duration: Number.parseInt(duration),
            aspect_ratio: ratio,
            generate_audio: sound,
          }
        : {}),
      ...(category === 'image' ? { aspect_ratio: ratio } : {}),
      ...(category === 'audio' && action.result === 'audio'
        ? { style: functionValues.style || genre }
        : {}),
    },
    null,
    2
  )

  const Content = props.embedded ? 'div' : 'main'
  const content = (
    <Content className={cn('studio-page', props.embedded && 'studio-embedded')}>
      <div className='studio-breadcrumb'>
        <a href='/pricing'>{t('Danh mục model')}</a>
        <ChevronRight size={13} />
        <span>{t('Không gian sáng tạo')}</span>
      </div>
      <header className='studio-heading'>
        <div>
          <div className='studio-eyebrow'>
            <span />
            {t('BEESKYBASE STUDIO')}
          </div>
          <h1>
            {t('Từ ý tưởng đến thành phẩm.')}
            <span aria-hidden='true'>
              <Sparkles size={30} />
            </span>
          </h1>
          <p>
            {t(
              'Chọn một model, mô tả ý tưởng và khám phá những gì AI có thể làm cho bạn.'
            )}
          </p>
        </div>
        <div className='studio-demo'>
          <Sparkles size={15} />
          <div>
            <strong>{t('Bản xem trước giao diện')}</strong>
            <span>{t('Dữ liệu mẫu · Không trừ số dư')}</span>
          </div>
        </div>
      </header>
      <div className='studio-topline'>
        <nav className='studio-categories' aria-label={t('Loại sáng tạo')}>
          {categories.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant='ghost'
                aria-pressed={category === item.id}
                className={cn(
                  'studio-category',
                  category === item.id && 'is-active'
                )}
                onClick={() => selectCategory(item.id)}
              >
                <Icon size={17} />
                {t(item.label)}
              </Button>
            )
          })}
        </nav>
        <Button
          variant='ghost'
          className='studio-history-button'
          onClick={() => setHistoryOpen(!historyOpen)}
          aria-expanded={historyOpen}
        >
          <History size={16} />
          {t('Lịch sử mẫu')}
          {history.length > 0 && <span>{history.length}</span>}
        </Button>
      </div>
      {historyOpen && (
        <section className='studio-history' aria-label={t('Lịch sử mẫu')}>
          <div className='studio-panel-heading'>
            <strong>{t('Các lần thử trong phiên này')}</strong>
            <Button
              size='icon'
              variant='ghost'
              aria-label={t('Đóng lịch sử')}
              onClick={() => setHistoryOpen(false)}
            >
              <X size={16} />
            </Button>
          </div>
          {history.length === 0 ? (
            <p>{t('Chưa có lần thử nào. Bấm “Xem kết quả mẫu” để bắt đầu.')}</p>
          ) : (
            history.map((item) => (
              <Button
                key={item.id}
                variant='ghost'
                className='studio-history-row'
                onClick={() => {
                  selectModel(item.model)
                  setPrompt(item.prompt)
                  setFunctionId(item.functionId)
                  setFunctionValues(item.values)
                  setHistoryOpen(false)
                }}
              >
                <span>{item.name}</span>
                <span>{item.prompt}</span>
                <ArrowRight size={14} />
              </Button>
            ))
          )}
        </section>
      )}
      <div className='studio-workspace'>
        <aside className='studio-models'>
          <div className='studio-panel-heading'>
            <h2>{t('Chọn model')}</h2>
            <span className='studio-count'>
              {models.filter((item) => item.category === category).length}
            </span>
          </div>
          <div className='studio-search'>
            <Search size={15} />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('Tìm model hoặc hãng...')}
              aria-label={t('Tìm model hoặc hãng...')}
            />
          </div>
          <div className='studio-model-list'>
            {modelList.map((item) => (
              <Button
                key={item.id}
                variant='ghost'
                className={cn(
                  'studio-model',
                  item.id === model.id && 'is-selected'
                )}
                aria-pressed={item.id === model.id}
                onClick={() => selectModel(item)}
              >
                <span className='studio-model-logo'>
                  {getLobeIcon(item.icon, 24)}
                </span>
                <span>
                  <strong>{item.name}</strong>
                  <small>{item.brand}</small>
                </span>
                {item.id === model.id && <Check size={15} />}
              </Button>
            ))}
            {modelList.length === 0 && (
              <p className='studio-no-models'>
                {t('Không tìm thấy model phù hợp.')}
              </p>
            )}
          </div>
          <div className='studio-tip'>
            <WandSparkles size={19} />
            <strong>{t('Chưa biết bắt đầu từ đâu?')}</strong>
            <p>
              {t(
                'Thử một gợi ý có sẵn, sau đó chỉnh lại theo ý tưởng của bạn.'
              )}
            </p>
            <Button variant='link' onClick={applyExample}>
              {t('Dùng mô tả mẫu')}
              <ArrowRight size={13} />
            </Button>
          </div>
          <div className='studio-models-foot'>
            <span />
            {t('Một nơi cho mọi ý tưởng')}
          </div>
        </aside>
        <section
          className='studio-input-panel'
          aria-label={t('Thiết lập yêu cầu')}
        >
          <div className='studio-selected-model'>
            <span className='studio-model-logo'>
              {getLobeIcon(model.icon, 28)}
            </span>
            <div>
              <h2>{model.name}</h2>
              <p>{t(model.note)}</p>
            </div>
            {model.badge && (
              <span className='studio-tag'>{t(model.badge)}</span>
            )}
          </div>
          <div className='studio-form'>
            <FunctionPicker
              functions={functions}
              selected={action}
              onChange={(id) => {
                stop()
                setFunctionId(id)
                setFunctionValues({})
                setValidation('')
              }}
            />
            <div className='studio-section-label'>
              <span>02</span>
              <h3>{t('Dữ liệu đầu vào')}</h3>
            </div>
            <FunctionFields
              key={model.id + action.id}
              action={action}
              values={functionValues}
              onChange={(key, value) => {
                setFunctionValues((previous) => ({
                  ...previous,
                  [key]: value,
                }))
                setValidation('')
              }}
            />
            {category !== 'audio' && (
              <>
                <div className='studio-label-line'>
                  <Label htmlFor='studio-prompt'>
                    {t(
                      category === 'chat'
                        ? 'Bạn muốn hỏi gì?'
                        : 'Mô tả điều bạn muốn tạo'
                    )}{' '}
                    <span className='studio-required'>*</span>
                  </Label>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => {
                      setPrompt(prompts[category])
                      setValidation('')
                    }}
                  >
                    <Sparkles size={13} />
                    {t('Dùng mẫu')}
                  </Button>
                </div>
                <Textarea
                  id='studio-prompt'
                  className='studio-prompt'
                  value={prompt}
                  onChange={(event) => {
                    setPrompt(event.target.value)
                    setValidation('')
                  }}
                  placeholder={t('Viết ý tưởng của bạn tại đây...')}
                  maxLength={3000}
                  aria-invalid={!!validation}
                  aria-describedby='studio-prompt-help'
                />
                <div className='studio-prompt-help' id='studio-prompt-help'>
                  <span>
                    {validation
                      ? t(validation)
                      : t(
                          'Càng rõ về bối cảnh, phong cách và chi tiết, kết quả càng sát ý.'
                        )}
                  </span>
                  <span>{prompt.length}/3000</span>
                </div>
                <div className='studio-inspirations'>
                  {inspiration[category].map((label, index) => (
                    <Button
                      variant='outline'
                      size='sm'
                      key={label}
                      onClick={() => {
                        setPrompt(`${t(label)}. ${prompts[category]}`)
                        setValidation('')
                      }}
                    >
                      <span>↗</span>
                      {t(label)}
                      {index === 0 && <Sparkles size={11} />}
                    </Button>
                  ))}
                </div>
              </>
            )}
            {validation && (
              <p className='studio-form-error' role='alert'>
                {validation}
              </p>
            )}
            {(category !== 'audio' || action.result === 'audio') && (
              <div className='studio-section-label studio-options-heading'>
                <span>03</span>
                <h3>{t('Tùy chỉnh kết quả')}</h3>
              </div>
            )}
            {category === 'video' && (
              <>
                <Choices
                  label='Độ phân giải'
                  values={['480p', '720p']}
                  value={resolution}
                  onChange={setResolution}
                />
                <div className='studio-two-fields'>
                  <Choices
                    label='Thời lượng'
                    values={['5 giây', '10 giây']}
                    value={duration}
                    onChange={setDuration}
                  />
                  <Choices
                    label='Tỷ lệ khung hình'
                    values={['16:9', '9:16', '1:1']}
                    value={ratio}
                    onChange={setRatio}
                  />
                </div>
                <Button
                  variant='ghost'
                  className='studio-sound-row'
                  role='switch'
                  aria-checked={sound}
                  onClick={() => setSound(!sound)}
                >
                  <Music2 size={17} />
                  <span>
                    <strong>{t('Thêm âm thanh')}</strong>
                    <small>{t('Âm thanh phù hợp với nội dung video')}</small>
                  </span>
                  <span className={cn('studio-switch', sound && 'is-on')}>
                    <span />
                  </span>
                </Button>
              </>
            )}
            {category === 'image' && (
              <Choices
                label='Tỷ lệ khung hình'
                values={['1:1', '16:9', '9:16']}
                value={ratio}
                onChange={setRatio}
              />
            )}
            {category === 'audio' && action.result === 'audio' && (
              <Choices
                label='Thể loại gợi ý'
                values={['Acoustic', 'Lo-fi', 'Pop']}
                value={genre}
                onChange={setGenre}
              />
            )}
            {category === 'chat' && (
              <p className='studio-context-note'>
                {t(
                  'Cứ viết như đang trò chuyện. Bạn có thể yêu cầu câu trả lời ngắn gọn, chi tiết hoặc theo một phong cách riêng.'
                )}
              </p>
            )}
            {category === 'tools' && (
              <p className='studio-context-note'>
                {t('Chọn ảnh bạn có quyền chỉnh sửa và mô tả phần cần xử lý.')}
              </p>
            )}
          </div>
          <div className='studio-run-area'>
            <div className='studio-estimate'>
              <span>{t('Chi phí lần thử này')}</span>
              <strong>
                {t('Miễn phí')}
                <span>{t('bản mẫu')}</span>
              </strong>
            </div>
            <Button
              className='studio-run'
              disabled={phase === 'running'}
              onClick={simulate}
            >
              {phase === 'running' ? (
                <LoaderCircle className='animate-spin' size={18} />
              ) : (
                <Sparkles size={18} />
              )}{' '}
              {t(phase === 'running' ? 'Đang mô phỏng...' : 'Xem kết quả mẫu')}
              <ArrowRight size={17} />
            </Button>
            <p>{t('Chế độ duyệt giao diện. Chưa gửi yêu cầu tạo nội dung.')}</p>
          </div>
        </section>
        <section className='studio-output-panel' aria-label={t('Kết quả mẫu')}>
          <div className='studio-panel-heading'>
            <h2>{t('Kết quả')}</h2>
            <span
              className={cn(
                'studio-result-status',
                phase === 'done' && 'is-done'
              )}
            >
              {phase === 'done' ? <Check size={12} /> : <span />}
              {t(phase === 'done' ? 'Mô phỏng hoàn tất' : 'Bản minh họa')}
            </span>
          </div>
          <div className='studio-output-tabs'>
            <Button
              variant='ghost'
              aria-pressed={outputTab === 'preview'}
              onClick={() => setOutputTab('preview')}
              className={cn(outputTab === 'preview' && 'is-active')}
            >
              <Play size={13} />
              {t('Xem trước')}
            </Button>
            <Button
              variant='ghost'
              aria-pressed={outputTab === 'request'}
              onClick={() => setOutputTab('request')}
              className={cn(outputTab === 'request' && 'is-active')}
            >
              <Code2 size={14} />
              {t('Thông số')}
            </Button>
          </div>
          <div className='studio-result-body' aria-live='polite'>
            {outputTab === 'request' ? (
              <div className='studio-request'>
                <div>
                  <span>{t('Thông số minh họa')}</span>
                  <CopyButton
                    value={request}
                    tooltip={t('Sao chép thông số')}
                  />
                </div>
                <pre>{request}</pre>
                <p>{t('Đây là thông số xem trước, chưa phải lệnh gọi API.')}</p>
              </div>
            ) : (
              <>
                {category === 'audio' && <FunctionOutput action={action} />}
                {category === 'chat' && (
                  <div className='studio-chat-sample'>
                    <span className='studio-sample-label'>
                      {t('Câu trả lời minh họa')}
                    </span>
                    <h3>{t('Một chút bình yên, một chuyến đi đáng nhớ.')}</h3>
                    <p>
                      {t(
                        'Dưới đây là 3 hướng nội dung cho homestay bên hồ của bạn:'
                      )}
                    </p>
                    {[
                      'Thức dậy giữa thiên nhiên',
                      'Một ngày sống chậm',
                      'Mang bình yên về nhà',
                    ].map((title, index) => (
                      <div key={title}>
                        <strong>
                          0{index + 1} · {t(title)}
                        </strong>
                        <p>
                          {t(
                            'Kể một câu chuyện gần gũi bằng ánh sáng ban mai, căn nhà nhỏ và những khoảnh khắc thư giãn bên mặt hồ.'
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {category !== 'audio' && category !== 'chat' && (
                  <div className='studio-preview-art'>
                    <Landscape />
                    <span className='studio-art-label'>
                      {t('Hình minh họa · Không phải kết quả AI')}
                    </span>
                    <div className='studio-art-caption'>
                      <span>{t('GỢI Ý SÁNG TẠO')}</span>
                      <h3>{t('Một sớm bình yên.')}</h3>
                      <p>
                        {t('Ánh sáng dịu. Chuyển động chậm. Cảm xúc tự nhiên.')}
                      </p>
                    </div>
                  </div>
                )}
                {phase === 'running' && (
                  <div className='studio-progress'>
                    <LoaderCircle size={24} className='animate-spin' />
                    <strong>{t('Đang chuẩn bị kết quả mẫu')}</strong>
                    <p>
                      {t(
                        'Đây là mô phỏng thao tác để bạn trải nghiệm giao diện.'
                      )}
                    </p>
                    <Button variant='outline' onClick={stop}>
                      {t('Hủy mô phỏng')}
                    </Button>
                  </div>
                )}
                <div className='studio-result-caption'>
                  <span className='studio-sample-label'>
                    {t('KẾT QUẢ MINH HỌA')}
                  </span>
                  <h3>
                    {t(
                      phase === 'done'
                        ? 'Ý tưởng đã có hình hài.'
                        : 'Thử một ý tưởng. Khám phá nhiều khả năng.'
                    )}
                  </h3>
                  <p>
                    {t(
                      'Khi kết nối API, nội dung được tạo sẽ xuất hiện tại đây. Hiện tại bạn đang xem dữ liệu mẫu.'
                    )}
                  </p>
                </div>
                <div className='studio-result-meta'>
                  <div>
                    <Clock3 size={15} />
                    <span>{t('Thời gian thực tế')}</span>
                    <strong>—</strong>
                  </div>
                  <div>
                    <Sparkles size={15} />
                    <span>{t('Chi phí thực tế')}</span>
                    <strong>{t('Chưa phát sinh')}</strong>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className='studio-output-bottom'>
            <Button
              variant='outline'
              onClick={() => {
                stop()
                setOutputTab('preview')
              }}
            >
              <RotateCcw size={14} />
              {t('Bắt đầu lại')}
            </Button>
            <span>{t('Nội dung mẫu để duyệt thiết kế')}</span>
          </div>
        </section>
      </div>
      <footer className='studio-footer'>
        <span>
          BEESKYBASE <span>STUDIO</span>
        </span>
        <p>{t('Bạn có ý tưởng. Phần còn lại, hãy để AI hỗ trợ.')}</p>
        <a href='/pricing'>
          {t('Khám phá bảng giá')}
          <ArrowRight size={13} />
        </a>
      </footer>
    </Content>
  )
  if (props.embedded) return content
  return (
    <PublicLayout showMainContainer={false} showNotifications={false}>
      {content}
    </PublicLayout>
  )
}

export function PlaygroundPreview(props: { embedded?: boolean }) {
  return props.embedded ? <LivePlayground /> : <StaticPlaygroundPreview />
}
