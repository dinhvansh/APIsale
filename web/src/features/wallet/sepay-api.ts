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
import { api } from '@/lib/api'

export interface SePayInfo {
  enabled: boolean
  vnd_per_usd: number
  min_usd: number
  max_usd: number
}
export interface SePayOrder {
  code: string
  amount_usd: number
  amount_vnd: number
  account_number: string
  account_name: string
  bank: string
  qr_url: string
  expires_at: number
  status: string
}
interface Result<T> {
  success: boolean
  data: T
  message?: string
}
export async function getSePayInfo(): Promise<SePayInfo> {
  const { data } = await api.get<Result<SePayInfo>>('/api/user/sepay/info')
  if (!data.success) {
    throw data
  }
  return data.data
}
export async function createSePayOrder(amountUSD: number): Promise<SePayOrder> {
  const { data } = await api.post<Result<SePayOrder>>('/api/user/sepay/pay', {
    amount_usd: amountUSD,
  })
  if (!data.success) {
    throw data
  }
  return data.data
}
export async function getSePayOrder(code: string): Promise<{ status: string }> {
  const { data } = await api.get<Result<{ status: string }>>(
    `/api/user/sepay/orders/${encodeURIComponent(code)}`
  )
  if (!data.success) {
    throw data
  }
  return data.data
}
