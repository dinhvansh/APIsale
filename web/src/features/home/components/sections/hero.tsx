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
import { useTranslation } from 'react-i18next'
import {
  TbArrowUpRight as ArrowUpRight,
  TbKey as KeyRound,
  TbStack2 as Layers3,
  TbChartBar as ChartNoAxesCombined,
  TbShieldCheck as ShieldCheck,
} from 'react-icons/tb'

import { CopyButton } from '@/components/copy-button'
import { Card, CardContent } from '@/components/ui/card'

import { HeroButtons } from '../hero-buttons'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
}

export function Hero(props: HeroProps) {
  const { t } = useTranslation()
  const endpoint = `${window.location.origin}/v1`
  const capabilities = [
    {
      icon: KeyRound,
      title: t('Your keys, your control'),
      description: t(
        'Create dedicated API keys and manage access in one place.'
      ),
    },
    {
      icon: Layers3,
      title: t('Models, connected'),
      description: t(
        'Connect your providers through one consistent API endpoint.'
      ),
    },
    {
      icon: ChartNoAxesCombined,
      title: t('Usage, made clear'),
      description: t('Track requests and consumption from your dashboard.'),
    },
  ]

  return (
    <main className={props.className}>
      <section
        className='bee-hero mx-auto max-w-6xl px-6 pt-28 pb-12 md:pt-36 md:pb-20'
        aria-labelledby='bee-title'
      >
        <div className='grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16'>
          <div>
            <div className='bee-eyebrow mb-7 inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold tracking-wide'>
              <span
                className='bee-status-dot size-2 rounded-full'
                aria-hidden='true'
              />
              BEESKYBASE / {t('AI GATEWAY')}
            </div>
            <h1
              id='bee-title'
              className='max-w-xl text-4xl leading-[1.12] font-semibold tracking-tight sm:text-5xl lg:text-6xl'
            >
              {t('Your AI workspace. One connection.')}
            </h1>
            <p className='text-muted-foreground mt-6 max-w-lg text-base leading-7'>
              {t(
                'Connect your models, manage API keys, and keep usage in view. A focused workspace for building with AI.'
              )}
            </p>
            <div className='mt-8 flex flex-wrap items-center gap-3'>
              <HeroButtons isAuthenticated={Boolean(props.isAuthenticated)} />
            </div>
            <p className='text-muted-foreground mt-6 flex items-center gap-2 text-xs'>
              <ShieldCheck className='size-4 shrink-0' aria-hidden='true' />
              {t('Your providers. Your access. Your workspace.')}
            </p>
          </div>
          <div className='bee-gateway overflow-hidden rounded-3xl border'>
            <div className='bee-art flex min-h-64 items-center justify-center p-10 sm:min-h-72'>
              <img
                src='/beesky-logo.svg'
                alt='BeeskyBase'
                width={176}
                height={176}
                className='size-40 sm:size-44'
              />
              <span className='bee-art-label' aria-hidden='true'>
                BB / 01
              </span>
            </div>
            <div className='bg-card border-border border-t p-5 sm:p-7'>
              <div className='mb-3 flex items-center justify-between gap-3'>
                <span className='text-muted-foreground text-xs font-medium tracking-wider uppercase'>
                  {t('API endpoint')}
                </span>
                <ArrowUpRight
                  className='text-muted-foreground size-4'
                  aria-hidden='true'
                />
              </div>
              <div className='bee-endpoint flex min-w-0 items-center gap-2 rounded-xl border p-3'>
                <code className='min-w-0 flex-1 overflow-x-auto text-xs leading-6 sm:text-sm'>
                  {endpoint}
                </code>
                <CopyButton
                  value={endpoint}
                  aria-label={t('Copy API endpoint')}
                  className='size-10'
                />
              </div>
              <p className='text-muted-foreground mt-3 text-xs leading-5'>
                {t('Add a provider in the console to start sending requests.')}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        className='mx-auto max-w-6xl px-6 pb-16 md:pb-24'
        aria-label={t('Workspace capabilities')}
      >
        <div className='mb-6 flex flex-wrap items-center justify-between gap-3 border-t pt-8'>
          <h2 className='text-lg font-semibold tracking-tight'>
            {t('Everything in one workspace')}
          </h2>
          <span className='text-muted-foreground text-xs'>01 - 03</span>
        </div>
        <div className='grid gap-4 md:grid-cols-3'>
          {capabilities.map((capability) => (
            <Card
              key={capability.title}
              className='bee-capability rounded-2xl py-6 shadow-none'
            >
              <CardContent>
                <div className='bee-icon mb-5 flex size-10 items-center justify-center rounded-xl'>
                  <capability.icon className='size-5' aria-hidden='true' />
                </div>
                <h3 className='text-base font-semibold'>{capability.title}</h3>
                <p className='text-muted-foreground mt-2 text-sm leading-6'>
                  {capability.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
