import { createWithErrorHandler } from 'prismy'

export const withErrorHandler = createWithErrorHandler({
  dev: true,
  json: true,
})
