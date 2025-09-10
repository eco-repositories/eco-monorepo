import react from '@vitejs/plugin-react'
import { defineConfig, ViteUserConfig } from 'vitest/config'
import { resolvePath } from '#shared/resolve-path/resolve-path.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react() as ViteUserConfig['plugins'], // FIXME: https://github.com/vitest-dev/vitest/issues/4048
  ],
  build: {
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    restoreMocks: true,
    setupFiles: [
      resolvePath(import.meta.url, 'vitest.setup.ts'),
    ],
    resolveSnapshotPath(path, extension) {
      return path.replace('.spec', extension)
    },
  },
})
