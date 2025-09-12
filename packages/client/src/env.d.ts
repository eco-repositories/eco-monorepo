import 'vite/client'
import 'vitest/globals'
import { /* side effects */ } from '#shared/api/api.type.js'

declare global {
  interface ImportMetaEnv {
    // TODO: uncomment when vite allows extending import.meta.env – see node_modules/vite@7.1.4/types/importMeta.d.ts
    // readonly VITE_SERVER_BASE_URL: string
  }
}
