import { defineConfig } from 'vitest/config'
import esbuildPluginTsc from 'esbuild-plugin-tsc'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const rootDir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  test: {
    root: rootDir,
    globals: true,
    mockReset: true,
    setupFiles: [
      resolve(rootDir, 'vitest.setup.ts'),
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
        esbuildPluginTsc({
          tsconfigPath: resolve(rootDir, 'tsconfig.json'),
        }),
      ],
    },
  },
})
