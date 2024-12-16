import react from '@vitejs/plugin-react'
import { defineConfig, ViteUserConfig } from 'vitest/config'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react() as ViteUserConfig['plugins'], // FIXME: https://github.com/vitest-dev/vitest/issues/4048
  ],
  resolve: {
    alias: [
      {
        find: /^@@libs\/@eco\/utils\/(.*)$/,
        replacement: resolve(__dirname, '..', '../../libs/@eco/utils/packages/utils/dist/src/$1'),
      },
      {
        find: /^@@shared\/(.*)$/,
        replacement: resolve(__dirname, '..', 'shared/dist/src/$1'),
      },
      {
        find: /^@\/(.*)$/,
        replacement: resolve(__dirname, 'src/$1'),
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
      resolve(__dirname, 'vitest.setup.ts'),
    ],
    resolveSnapshotPath(path, extension) {
      return path.replace('.spec', extension)
    },
  },
})
