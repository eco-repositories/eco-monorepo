import { defineConfig } from 'vitest/config'
import { esbuildDecorators } from '@anatine/esbuild-decorators'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@@libs\/@eco\/utils\/(.*)$/,
        replacement: resolve(__dirname, '../..', 'libs/@eco/utils/packages/utils/dist/src/$1'),
      },
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
        // The `esbuildDecorators(…)` call below might show compiler error, which the instructions below might help to understand.
        // Don't remove the comment: even if it seems to be outdated, it still might be able to nudge in the right direction.
        /*
          The original error:
            'esbuildDecorators' function returns something that 'plugins' array cannot accept
              'esbuildDecorators' function returns 'string' (deeply inside an object)
                node_modules/esbuild[v0.19.2]/lib/main.d.ts
                -> TsconfigRaw.compilerOptions.baseUrl
                -> 'string'
              'plugins' array accepts 'boolean' (deeply inside an object)
                node_modules/vite[v4.4.9]/node_modules/esbuild[v0.18.20]/lib/main.d.ts
                -> TsconfigRaw.compilerOptions.baseUrl
                -> 'boolean'
                  See https://github.com/evanw/esbuild/pull/3299
          The solution:
            Ideal:
              @anatine/esbuild-decorators should depend on the version of esbuild with baseUrl being a string
            Temporary:
              Manually override esbuild to be of the same after-the-fix version for everyone
         */
        esbuildDecorators({
          tsconfig: resolve(__dirname, 'tsconfig.json'),
        }),
      ],
    },
  },
})
