import 'vite/client'
import 'vitest/globals'

declare global {
  interface ImportMetaEnv {
    readonly VITE_SERVER_BASE_URL: string
  }
}
