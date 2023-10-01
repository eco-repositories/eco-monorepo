/**
 * Cannot use typeorm-ts-node-esm because it resolves path aliases with
 * tsconfig-paths, which does not support ESModules (I know, right? 🙃)
 */
import { spawnSync } from 'child_process'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const tsxCliFilePath = require.resolve('tsx/cli')
const typeormCliFilePath = require.resolve('typeorm/cli')
const args = [
  typeormCliFilePath,
  ...process.argv.slice(2),
]

// run the same command but through `tsx` to support TypeScript, ESM, and path aliases
const childProcess = spawnSync(tsxCliFilePath, args, {
  stdio: 'inherit',
  env: process.env,
})

process.exitCode = childProcess.status ?? 0
