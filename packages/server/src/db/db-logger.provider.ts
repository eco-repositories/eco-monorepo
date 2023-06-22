import { type Logger, type Provider } from '@nestjs/common'
import { createLogger } from '@/common/create-logger.js'

export type DbLogger = Logger

export const DB_LOGGER = Symbol('DB_LOGGER')

export const DbLoggerProvider: Provider<DbLogger> = {
  provide: DB_LOGGER,
  useFactory(): Logger {
    const logger = createLogger('DB_LOGGER')

    return logger
  },
}
