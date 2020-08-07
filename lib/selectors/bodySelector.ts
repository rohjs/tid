import { SyncSelector } from 'prismy'

export const bodySelector: SyncSelector<any> = (ctx) => (ctx.req as any).body
