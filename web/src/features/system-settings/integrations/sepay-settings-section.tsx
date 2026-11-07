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
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useImperativeHandle, type Ref } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { z } from 'zod'

import { CopyButton } from '@/components/copy-button'
import { PasswordInput } from '@/components/password-input'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { api } from '@/lib/api'
import { handleServerError } from '@/lib/handle-server-error'

const schema = z.object({
  enabled: z.boolean(),
  account_number: z.string().regex(/^[0-9]{6,20}$/),
  account_name: z.string().trim().min(1).max(100),
  vnd_per_usd: z.coerce.number().int().min(1).max(1000000),
  webhook_secret: z
    .string()
    .refine(
      (value) => value === '' || (value.length >= 32 && value.length <= 256),
      'Use at least 32 characters for the webhook secret'
    ),
})
type Config = z.infer<typeof schema>
interface ConfigResult {
  success: boolean
  data: { config: Config; secret_configured: boolean }
}

export type SePaySettingsHandle = {
  isDirty: () => boolean
  validate: () => Promise<boolean>
  save: () => Promise<void>
}

export function SePaySettingsSection({
  ref,
}: {
  ref?: Ref<SePaySettingsHandle>
}) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const query = useQuery({
    queryKey: ['sepay-admin'],
    queryFn: async () => {
      const { data } = await api.get<ConfigResult>('/api/option/sepay')
      if (!data.success) {
        throw data
      }
      return data.data
    },
  })
  const form = useForm<Config>({
    resolver: zodResolver(schema) as Resolver<Config>,
    defaultValues: {
      enabled: false,
      account_number: '',
      account_name: '',
      vnd_per_usd: 26000,
      webhook_secret: '',
    },
  })
  useEffect(() => {
    if (query.data && !form.formState.isDirty) {
      form.reset({ ...query.data.config, webhook_secret: '' })
    }
  }, [query.data, form, form.formState.isDirty])
  const save = useMutation({
    mutationFn: async (values: Config) => {
      const { data } = await api.post<ConfigResult>('/api/option/sepay', values)
      if (!data.success) {
        throw data
      }
      return data
    },
    onSuccess: (result) => {
      queryClient.setQueryData(['sepay-admin'], result.data)
      form.reset({ ...result.data.config, webhook_secret: '' })
      toast.success(t('SePay settings saved'))
      void query.refetch()
    },
    onError: (error) =>
      handleServerError(error, t('Failed to save configuration')),
  })
  useImperativeHandle(ref, () => ({
    isDirty: () => form.formState.isDirty,
    validate: async () => !form.formState.isDirty || (await form.trigger()),
    save: async () => {
      if (form.formState.isDirty) await save.mutateAsync(form.getValues())
    },
  }))
  return (
    <Card className='gap-0 py-0'>
      <CardHeader className='border-b p-5'>
        <CardTitle>MB Bank / SePay</CardTitle>
        <CardDescription>
          {t(
            'Automatically credit wallet balances from verified incoming MB Bank transfers.'
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4 p-5'>
        {query.isError && <p role='alert'>{t('Failed to load')}</p>}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => save.mutate(values))}
            data-no-autosubmit='true'
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='enabled'
              render={({ field }) => (
                <FormItem className='flex items-center justify-between'>
                  <FormLabel>{t('Enable MB Bank payments')}</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className='grid gap-4 sm:grid-cols-2'>
              <FormField
                control={form.control}
                name='account_number'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Account number')}</FormLabel>
                    <FormControl>
                      <Input {...field} inputMode='numeric' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='account_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Account holder')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='vnd_per_usd'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('VND per 1 USD balance')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                        min={1}
                        max={1000000}
                        step={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='webhook_secret'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('SePay webhook API key')}</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        autoComplete='new-password'
                        placeholder={
                          query.data?.secret_configured
                            ? t('Configured. Leave blank to keep unchanged.')
                            : t(
                                'Use at least 32 characters for the webhook secret'
                              )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <p className='text-muted-foreground text-sm'>
              {t(
                'In SePay, select incoming transfers, this MB Bank account, and API Key authentication. Use the same key in both systems.'
              )}
            </p>
            <div className='flex items-center gap-2 rounded-lg border p-3 text-xs'>
              <code className='min-w-0 flex-1 break-all'>
                {`${window.location.origin}/api/sepay/webhook`}
              </code>
              <CopyButton
                value={`${window.location.origin}/api/sepay/webhook`}
                aria-label={t('Copy webhook URL')}
              />
            </div>
            <p className='text-muted-foreground text-xs'>
              {t(
                'SePay needs a public HTTPS webhook URL. Localhost requires a development tunnel.'
              )}
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
