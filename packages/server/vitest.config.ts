import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'
import { resolvePath } from '#shared/resolve-path/resolve-path.js'

const resolve = resolvePath.bind(null, import.meta.url)

export default defineConfig({
  plugins: [
    swc.vite({
      tsconfigFile: resolve('tsconfig.json'),
    }),
  ],
  test: {
    globals: true,
    mockReset: true,
    setupFiles: [
      resolve('vitest.setup.ts'),
    ],
    resolveSnapshotPath(path, extension) {
      return path
        .replace('.spec', extension)
        .replace('.e2e-spec', extension)
    },
  },
})
