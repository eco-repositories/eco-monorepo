import { defineConfig } from 'vitest/config'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const rootDir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@@libs\/@eco\/utils\/(.*)$/,
        replacement: resolve(rootDir, '../..', 'libs/@eco/utils/packages/utils/dist/src/$1'),
      },
      {
        find: /^@\/(.*)$/,
        replacement: resolve(rootDir, 'src/$1'),
      },
    ],
  },
  test: {
    root: rootDir,
    globals: true,
    mockReset: true,
    passWithNoTests: true,
    resolveSnapshotPath(path, extension) {
      return path.replace('.spec', extension)
    },
  },
})
