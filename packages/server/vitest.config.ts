import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    root: __dirname,
    globals: true,
    mockReset: true,
    resolveSnapshotPath(path, extension) {
      return path
        .replace('.spec', extension)
        .replace('.e2e-spec', extension)
    },
  },
})
