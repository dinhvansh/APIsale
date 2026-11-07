import { ArrowRight, FileAudio, Music2, Upload, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import type { Field, StudioFunction } from './function-catalog'

export function FunctionPicker(props: {
  functions: StudioFunction[]
  selected: StudioFunction
  onChange: (value: string) => void
}) {
  const { t } = useTranslation()
  return (
    <section className='studio-function-picker'>
      <div className='studio-section-label'>
        <span>01</span>
        <h3>{t('Bạn muốn làm gì?')}</h3>
        <small>
          {props.functions.length} {t('chức năng')}
        </small>
      </div>
      <Select
        value={props.selected.id}
        onValueChange={(value) => {
          if (value) props.onChange(value)
        }}
      >
        <SelectTrigger
          className='studio-function-trigger'
          aria-label={t('Chọn chức năng')}
        >
          <SelectValue>{t(props.selected.name)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {props.functions.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              <span className='studio-function-option'>
                <strong>{t(item.name)}</strong>
                <small>{t(item.description)}</small>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p>{t(props.selected.description)}</p>
      <div className='studio-function-flow'>
        <span>{t(props.selected.input)}</span>
        <ArrowRight size={13} />
        <span>{t(props.selected.output)}</span>
      </div>
    </section>
  )
}

function LocalSource(props: {
  field: Field
  onChange: (value: string) => void
}) {
  const { t } = useTranslation()
  const input = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<{ name: string; url: string } | null>(null)
  const [error, setError] = useState('')
  useEffect(
    () => () => {
      if (file) URL.revokeObjectURL(file.url)
    },
    [file]
  )
  const isImage = props.field.kind === 'image'
  return (
    <div className='studio-local-source'>
      <Input
        ref={input}
        type='file'
        className='sr-only'
        aria-label={t(props.field.label)}
        accept={
          isImage
            ? 'image/png,image/jpeg,image/webp'
            : 'audio/mpeg,audio/wav,audio/x-wav,audio/mp4,audio/flac'
        }
        onChange={(event) => {
          const picked = event.target.files?.[0]
          if (!picked) return
          event.target.value = ''
          if (!picked.type.startsWith(isImage ? 'image/' : 'audio/')) {
            setError(t('Vui lòng chọn đúng loại tệp.'))
            return
          }
          if (picked.size > 50 * 1024 * 1024) {
            setError(t('Tệp mẫu cần nhỏ hơn 50 MB.'))
            return
          }
          setError('')
          setFile({ name: picked.name, url: URL.createObjectURL(picked) })
          props.onChange(picked.name)
        }}
      />
      {file ? (
        <div className='studio-source-selected'>
          {isImage ? (
            <img src={file.url} alt={t('Ảnh đã chọn')} />
          ) : (
            <FileAudio size={25} />
          )}
          <strong>{file.name}</strong>
          <Button
            variant='ghost'
            size='icon'
            aria-label={t('Xóa tệp')}
            onClick={() => {
              setFile(null)
              props.onChange('')
            }}
          >
            <X size={15} />
          </Button>
          {!isImage && (
            <audio controls src={file.url} aria-label={t('Nghe tệp gốc')} />
          )}
        </div>
      ) : (
        <Button
          variant='outline'
          className='studio-source-upload'
          onClick={() => input.current?.click()}
        >
          <Upload size={18} />
          <strong>
            {t(isImage ? 'Chọn ảnh đầu vào' : 'Chọn tệp âm thanh')}
          </strong>
          <small>
            {t(isImage ? 'JPG, PNG, WEBP' : 'MP3, WAV, M4A, FLAC')} ·{' '}
            {t('Tệp chỉ lưu trên thiết bị')}
          </small>
        </Button>
      )}
      {error && <p role='alert'>{error}</p>}
    </div>
  )
}

export function FunctionFields(props: {
  action: StudioFunction
  values: Record<string, string>
  onChange: (key: string, value: string) => void
}) {
  const { t } = useTranslation()
  return (
    <div className='studio-function-fields'>
      {props.action.fields.map((field) => (
        <div className='studio-action-field' key={field.key}>
          <Label htmlFor={`function-${field.key}`}>
            {t(field.label)}
            {field.required && <span className='studio-required'> *</span>}
          </Label>
          {field.kind === 'audio' || field.kind === 'image' ? (
            <LocalSource
              field={field}
              onChange={(value) => props.onChange(field.key, value)}
            />
          ) : null}
          {field.kind === 'song' && (
            <Select
              value={props.values[field.key] ?? null}
              onValueChange={(value) => props.onChange(field.key, value ?? '')}
            >
              <SelectTrigger
                id={`function-${field.key}`}
                className='studio-function-trigger'
                aria-label={t(field.label)}
              >
                <SelectValue placeholder={t('Chọn bài hát mẫu...')}>
                  {props.values[field.key] === 'demo-morning' && t('Một sớm bình yên · Bài mẫu')}
                  {props.values[field.key] === 'demo-journey' && t('Những chuyến đi · Bài mẫu')}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='demo-morning'>
                  {t('Một sớm bình yên · Bài mẫu')}
                </SelectItem>
                <SelectItem value='demo-journey'>
                  {t('Những chuyến đi · Bài mẫu')}
                </SelectItem>
              </SelectContent>
            </Select>
          )}
          {field.kind === 'textarea' && (
            <Textarea
              id={`function-${field.key}`}
              value={props.values[field.key] ?? ''}
              onChange={(event) =>
                props.onChange(field.key, event.target.value)
              }
              placeholder={t(field.placeholder ?? '')}
              maxLength={
                field.key === 'prompt' && props.action.id === 'lyrics'
                  ? 200
                  : 3000
              }
            />
          )}
          {(field.kind === 'text' || field.kind === 'number') && (
            <Input
              id={`function-${field.key}`}
              type={field.kind === 'number' ? 'number' : 'text'}
              min={field.kind === 'number' ? 1 : undefined}
              maxLength={field.key === 'title' ? 80 : 1000}
              value={props.values[field.key] ?? ''}
              onChange={(event) =>
                props.onChange(field.key, event.target.value)
              }
              placeholder={t(field.placeholder ?? '')}
            />
          )}
          {field.hint && <p className='studio-field-hint'>{t(field.hint)}</p>}
        </div>
      ))}
    </div>
  )
}

export function FunctionOutput(props: { action: StudioFunction }) {
  const { t } = useTranslation()
  if (props.action.result === 'lyrics') {
    return (
      <div className='studio-lyrics-result'>
        <span className='studio-sample-label'>{t('LỜI BÀI HÁT MINH HỌA')}</span>
        <h3>{t('Những chuyến đi')}</h3>
        <p>
          [Verse]
          <br />
          {t('Nắng thức giấc trên con đường quen thuộc')}
          <br />
          {t('Ta mang theo một khoảng trời xanh')}
        </p>
        <p>
          [Chorus]
          <br />
          {t('Cùng nhau đi qua những mùa tuổi trẻ')}
          <br />
          {t('Giữ trong tim những ngày thật trong lành')}
        </p>
      </div>
    )
  }
  const items =
    props.action.result === 'stems'
      ? ['Giọng hát riêng', 'Nhạc nền riêng']
      : [
          props.action.result === 'file'
            ? 'Tệp âm thanh WAV'
            : 'Bài hát của bạn',
        ]
  return (
    <div className='studio-audio-result'>
      <div className='studio-audio-cover'>
        <Music2 size={36} />
        <span>{t(props.action.name)}</span>
        <small>{t('Kết quả minh họa')}</small>
      </div>
      {items.map((label) => (
        <div className='studio-audio-track' key={label}>
          <FileAudio size={22} />
          <div>
            <strong>{t(label)}</strong>
            <span>{t('Chưa có tệp âm thanh thực tế')}</span>
          </div>
          <span className='studio-track-format'>
            {props.action.result === 'file' ? 'WAV' : 'AUDIO'}
          </span>
        </div>
      ))}
      <p>
        {t('Khi kết nối API, bạn sẽ nghe thử và tải kết quả ngay tại đây.')}
      </p>
    </div>
  )
}
