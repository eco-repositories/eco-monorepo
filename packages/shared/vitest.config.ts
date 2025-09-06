import { defineConfig } from 'vitest/config'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const rootDir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: [
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
