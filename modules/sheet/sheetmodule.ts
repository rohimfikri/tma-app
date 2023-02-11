import { resolve } from 'node:path'

export default async (_options: any, nuxt: { options: { nitro: { externals: { inline?: any } } }; hook: (arg0: string, arg1: (contentContext: any) => void) => void }) => {
  nuxt.options.nitro.externals = nuxt.options.nitro.externals || {}
  nuxt.options.nitro.externals.inline = nuxt.options.nitro.externals.inline || []
  nuxt.options.nitro.externals.inline.push(resolve('./modules/sheet/sheetmodule'))
  // @ts-ignore
  nuxt.hook('content:context', (contentContext) => {
    contentContext.transformers.push(resolve('./modules/sheet/sheetformer.ts'))
  })
}