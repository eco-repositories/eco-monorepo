import 'reflect-metadata'
import { validateConfig } from '#shared/microservices/config/validate-config.js'
import { EnvName } from '#shared/microservices/config/env-name.js'
import { ConfigDTO } from '#@/config/config.dto.js'

const envOriginal = { ...process.env }

const envMock = validateConfig(ConfigDTO, {
  NODE_ENV: EnvName.test,
  PORT: '3500',
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
