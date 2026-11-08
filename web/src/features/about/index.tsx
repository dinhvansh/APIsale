/*

Copyright (C) 2023-2026 QuantumNous



This program is free software: you can redistribute it and/or modify

it under the terms of the GNU Affero General Public License as

published by the Free Software Foundation, either version 3 of the

License, or (at your option) any later version.



This program is distributed in the hope that it will be useful,

but WITHOUT ANY WARRANTY; without even the implied warranty of

MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the

GNU Affero General Public License for more details.



You should have received a copy of the GNU Affero General Public License

along with this program. If not, see <https://www.gnu.org/licenses/>.



For commercial licensing, please contact support@quantumnous.com

*/

import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { TbArrowUpRight, TbKey, TbSparkles, TbWallet } from 'react-icons/tb'

import { PublicLayout } from '@/components/layout'
import { RichContent } from '@/components/rich-content'
import { Skeleton } from '@/components/ui/skeleton'
import { isHttpUrl, isLikelyHtml } from '@/lib/content-format'
import { requireServerSuccess } from '@/lib/server-error-message'

import { getAboutContent } from './api'

function EmptyAboutState() {
  const { t } = useTranslation()

  return (
    <section className='mx-auto max-w-6xl space-y-12 px-5 py-12 sm:py-20'>
      <div className='grid items-center gap-10 md:grid-cols-[1.5fr_1fr]'>
        <div className='space-y-6'>
          <p className='text-sm font-semibold tracking-widest'>
            BEESKYBASE / {t('About')}
          </p>
          <h1 className='text-4xl font-semibold tracking-tight sm:text-6xl'>
            {t('AI tools. One place to begin.')}
          </h1>
          <p className='text-muted-foreground max-w-2xl text-lg leading-relaxed'>
            {t(
              'BeeskyBase brings AI models together so you can create, integrate and track your usage in one workspace.'
            )}
          </p>
          <div className='flex flex-wrap gap-3'>
            <Link
              to='/playground'
              className='inline-flex items-center gap-2 rounded-full bg-[#f3d900] px-6 py-3 font-semibold text-black'
            >
              {t('Try AI')} <TbArrowUpRight aria-hidden='true' />
            </Link>
            <Link
              to='/docs'
              className='rounded-full border px-6 py-3 font-semibold'
            >
              {t('Docs')}
            </Link>
          </div>
        </div>
        <div className='flex aspect-square items-center justify-center rounded-[2rem] bg-[#f3d900] p-14'>
          <img
            src='/beesky-logo.svg'
            alt='BeeskyBase'
            className='w-full max-w-56 rounded-full'
          />
        </div>
      </div>
      <div className='grid gap-4 md:grid-cols-3'>
        {[
          {
            icon: TbSparkles,
            title: 'Create with AI',
            text: 'Explore chat, image, video and music tools. Choose a model and a function in Studio before you run.',
          },

          {
            icon: TbKey,
            title: 'Build with one API',
            text: 'Create an API key and follow our documentation to connect BeeskyBase to your application.',
          },

          {
            icon: TbWallet,
            title: 'Keep costs in view',
            text: 'See your credit balance, check estimated costs before running and review your usage history.',
          },
        ].map(({ icon: Icon, title, text }) => (
          <article
            key={title}
            className='bg-card space-y-4 rounded-3xl border p-7'
          >
            <Icon className='size-8' aria-hidden='true' />
            <h2 className='text-xl font-semibold'>{t(title)}</h2>
            <p className='text-muted-foreground leading-relaxed'>{t(text)}</p>
          </article>
        ))}
      </div>
      <div className='rounded-3xl border p-7 sm:p-10'>
        <h2 className='mb-6 text-2xl font-semibold'>
          {t('Start in three steps')}
        </h2>
        <ol className='grid gap-6 md:grid-cols-3'>
          {[
            'Create your account',
            'Add credits to your wallet',
            'Try Studio or connect your API key',
          ].map((step, index) => (
            <li key={step} className='flex items-start gap-3'>
              <span className='flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f3d900] font-semibold text-black'>
                {index + 1}
              </span>
              <span className='pt-1'>{t(step)}</span>
            </li>
          ))}
        </ol>
        <p className='text-muted-foreground mt-8 text-sm'>
          {t(
            '1 USD = 1,000 credits. At the current deposit rate, 1 credit = 26 VND. Actual costs depend on the model and function.'
          )}
        </p>
      </div>
      <p className='text-muted-foreground text-sm'>
        {t('Open source foundation')}:{' '}
        <a href='https://github.com/dinhvansh/APIsale' className='underline'>
          BeeskyBase
        </a>{' '}
        ·{' '}
        <a href='https://github.com/QuantumNous/new-api' className='underline'>
          New API
        </a>{' '}
        · AGPL-3.0
      </p>
    </section>
  )
}

export function About() {
  const { t } = useTranslation()

  const { data, isLoading } = useQuery({
    queryKey: ['about-content'],

    queryFn: async () => requireServerSuccess(await getAboutContent()),
  })

  const rawContent = data?.data?.trim() ?? ''

  const hasContent = rawContent.length > 0

  const isUrl = hasContent && isHttpUrl(rawContent)

  const contentIsHtml = hasContent && isLikelyHtml(rawContent)

  if (isLoading) {
    return (
      <PublicLayout>
        <div className='mx-auto flex max-w-4xl flex-col gap-4 py-12'>
          <Skeleton className='h-8 w-[45%]' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-[90%]' />
          <Skeleton className='h-4 w-[80%]' />
        </div>
      </PublicLayout>
    )
  }

  if (!hasContent) {
    return (
      <PublicLayout>
        <EmptyAboutState />
      </PublicLayout>
    )
  }

  if (isUrl) {
    return (
      <PublicLayout showMainContainer={false}>
        <iframe
          src={rawContent}

          className='h-[calc(100vh-3.5rem)] w-full border-0'

          title={t('About')}

          sandbox='allow-forms allow-popups allow-popups-to-escape-sandbox allow-scripts'
        />
      </PublicLayout>
    )
  }

  if (contentIsHtml) {
    return (
      <PublicLayout showMainContainer={false}>
        <RichContent
          mode='html'

          htmlVariant='isolated'

          content={rawContent}

          className='prose-neutral dark:prose-invert max-w-none'
        />
      </PublicLayout>
    )
  }

  return (
    <PublicLayout>
      <div className='mx-auto max-w-6xl px-4 py-8'>
        <RichContent
          mode='markdown'

          content={rawContent}

          className='prose-neutral dark:prose-invert max-w-none'
        />
      </div>
    </PublicLayout>
  )
}
