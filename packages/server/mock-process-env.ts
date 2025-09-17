import 'reflect-metadata'
import { validateConfig } from './src/config/validate-config.js'
import { EnvName } from './src/config/env-name.js'

const envOriginal = { ...process.env }

const envMock = validateConfig({
  NODE_ENV: EnvName.test,
  PORT: '2999',
  CACHE_HOST: 'localhost',
  CACHE_PASS: 'cache_password',
  CACHE_PORT: '6379',
  DB_HOST: 'localhost',
  DB_NAME: 'test',
  DB_PASS: 'database_password',
  DB_PORT: '5432',
  DB_USER: 'postgres',
})

export function setup(): void {
  Object.assign(process.env, envMock)
}

export function teardown(): void {
  Object.assign(process.env, envOriginal)
}
