import react from '@vitejs/plugin-react'
import { defineConfig, ViteUserConfig } from 'vitest/config'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const rootDir = dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react() as ViteUserConfig['plugins'], // FIXME: https://github.com/vitest-dev/vitest/issues/4048
  ],
  resolve: {
    alias: [
      {
        find: /^@@libs\/@eco\/utils\/(.*)$/,
        replacement: resolve(rootDir, '..', '../../libs/@eco/utils/packages/utils/dist/src/$1'),
      },
      {
        find: /^@@shared\/(.*)$/,
        replacement: resolve(rootDir, '..', 'shared/dist/src/$1'),
      },
      {
        find: /^@\/(.*)$/,
        replacement: resolve(rootDir, 'src/$1'),
      },
    ],
  },
  build: {
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    restoreMocks: true,
    setupFiles: [
      resolve(rootDir, 'vitest.setup.ts'),
    ],
    resolveSnapshotPath(path, extension) {
      return path.replace('.spec', extension)
    },
  },
})
