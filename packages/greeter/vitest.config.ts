import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'
import { resolvePath } from '#shared/resolve-path/resolve-path.js'

export default defineConfig({
  plugins: [
    swc.vite({
      tsconfigFile: resolvePath(import.meta.url, 'tsconfig.json'),
    }),
  ],
  test: {
    globals: true,
    mockReset: true,
    setupFiles: [
      'reflect-metadata',
    ],
    include: [
      '**/*.spec.ts',
    ],
    resolveSnapshotPath(path, extension) {
      return path
        .replace('.spec', extension)
    },
  },
})
