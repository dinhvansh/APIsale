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
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import {
  TbArrowUpRight,
  TbHexagons,
  TbSparkles,
  TbSquareKey,
} from 'react-icons/tb'

import { Skeleton } from '@/components/ui/skeleton'
import { useSystemConfig } from '@/hooks/use-system-config'

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout(props: AuthLayoutProps) {
  const { t } = useTranslation()
  const { systemName, logo, loading } = useSystemConfig()

  return (
    <div className='bee-auth'>
      <header className='bee-auth-header'>
        <Link to='/' className='bee-auth-brand'>
          {loading ? (
            <Skeleton className='h-10 w-10 rounded-full' />
          ) : (
            <img
              src={logo}
              alt={t('Logo')}
              className='h-10 w-10 rounded-full object-cover'
            />
          )}
          {loading ? (
            <Skeleton className='h-6 w-28' />
          ) : (
            <span>{systemName}</span>
          )}
        </Link>
        <Link to='/' className='bee-auth-home'>
          {t('Back to home')} <TbArrowUpRight aria-hidden='true' />
        </Link>
      </header>
      <div className='bee-auth-grid'>
        <aside className='bee-auth-story' aria-label={t('Your AI workspace')}>
          <div className='bee-auth-eyebrow'>
            <TbSparkles aria-hidden='true' /> {t('Your AI workspace')}
          </div>
          <h2>
            {t('One connection.')}
            <br />
            <span>{t('More possibilities.')}</span>
          </h2>
          <p>
            {t(
              'Connect models, manage API keys, and build your next idea in one place.'
            )}
          </p>
          <div className='bee-auth-art' aria-hidden='true'>
            <div className='bee-auth-orbit bee-auth-orbit-one' />
            <div className='bee-auth-orbit bee-auth-orbit-two' />
            <div className='bee-auth-art-core'>
              <TbHexagons />
            </div>
            <span className='bee-auth-art-key'>
              <TbSquareKey />
            </span>
            <span className='bee-auth-art-spark'>
              <TbSparkles />
            </span>
            <span className='bee-auth-art-label'>API / AI / BUILD</span>
          </div>
          <div className='bee-auth-story-footer'>
            <span className='bee-auth-dot' />
            {t('A simpler way to build with AI')}
          </div>
        </aside>
        <main className='bee-auth-main'>
          <div className='bee-auth-card'>{props.children}</div>
        </main>
      </div>
    </div>
  )
}
