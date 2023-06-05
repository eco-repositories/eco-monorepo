import { defineConfig } from 'vitest/config'
import { esbuildDecorators } from '@anatine/esbuild-decorators'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: [
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
  test: {
    root: __dirname,
    globals: true,
    mockReset: true,
    setupFiles: [
      resolve(__dirname, 'vitest.setup.ts'),
    ],
    resolveSnapshotPath(path, extension) {
      return path
        .replace('.spec', extension)
        .replace('.e2e-spec', extension)
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        esbuildDecorators({
          tsconfig: resolve(__dirname, 'tsconfig.json'),
        }),
      ],
    },
  },
})
