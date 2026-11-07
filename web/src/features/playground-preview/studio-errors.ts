import { isAxiosError } from 'axios'

export function studioSubmissionError(error: unknown): string {
  if (isAxiosError(error)) {
    const data = error.response?.data
    const message = data?.error?.message ?? data?.message
    if (
      error.response?.status === 409 &&
      typeof message === 'string' &&
      message.includes('source task was generated') &&
      message.includes('does not support this operation')
    ) {
      return 'This song source does not support this operation. Choose another song or use the MP3 result.'
    }
    if (
      error.response?.status === 404 &&
      typeof message === 'string' &&
      message.includes('No provider configured for this model')
    ) {
      return 'This model is temporarily unavailable. Please choose another model.'
    }
  }
  return 'The request could not be completed. Check your balance, connection and model availability. If acceptance is uncertain, check history before trying again.'
}
