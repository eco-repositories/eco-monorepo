import 'vite/client'

declare global {
  interface ImportMetaEnv {
    readonly VITE_SERVER_BASE_URL: string
  }
}
