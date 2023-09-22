import 'vite/client'
import 'vitest/globals'
import { /* side effects */ } from '@@shared/api/api.type.js'

declare global {
  interface ImportMetaEnv {
    readonly VITE_SERVER_BASE_URL: string
  }
}
