import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    mockReset: true,
    passWithNoTests: true,
    resolveSnapshotPath(path, extension) {
      return path.replace('.spec', extension)
    },
  },
})
