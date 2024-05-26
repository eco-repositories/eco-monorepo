import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@@utils\/(.*)$/,
        replacement: resolve(__dirname, '../..', 'libs/@eco/utils/packages/utils/dist/src/$1'),
      },
      {
        find: /^@\/(.*)$/,
        replacement: resolve(__dirname, 'src/$1'),
      },
    ],
  },
  test: {
    root: __dirname,
    globals: true,
    mockReset: true,
    resolveSnapshotPath(path, extension) {
      return path.replace('.spec', extension)
    },
  },
})
