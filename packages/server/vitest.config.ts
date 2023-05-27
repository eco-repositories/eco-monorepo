import { defineConfig } from 'vitest/config'

/** @private */
const testPathPattern = /(?<suffix>\.(?:e2e-)?spec)(?<extension>\.ts)$/

export default defineConfig({
  test: {
    root: __dirname,
    globals: true,
    mockReset: true,
    resolveSnapshotPath(path, extension) {
      return path.replace(testPathPattern, `${extension}$2`)
    },
  },
})
