import { type Provider } from '@nestjs/common'
import { type DataSourceOptions } from 'typeorm'
import { fileURLToPath } from 'url'
import { resolve } from 'path'
import { ConfigService } from '@/config/config.service.js'
import { DbLogger } from './db-logger.js'

export { type DataSourceOptions } from 'typeorm'

/** @private Path to `/src` or `/dist` */
const packageSourceCodeDirPath = fileURLToPath(new URL('../..', import.meta.url))

/** @private */
const dbLogger = new DbLogger()

export const DATA_SOURCE_OPTIONS_PROVIDER = Symbol('DATA_SOURCE_OPTIONS_PROVIDER')

export const dataSourceOptionsProvider: Provider<DataSourceOptions> = {
  provide: DATA_SOURCE_OPTIONS_PROVIDER,
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    host: config.get(config.keys.DB_HOST),
    port: +config.get(config.keys.DB_PORT),
    username: config.get(config.keys.DB_USER),
    password: config.get(config.keys.DB_PASS),
    database: config.get(config.keys.DB_NAME),
    entities: [
      resolve(packageSourceCodeDirPath, '**/*.{model,entity}.{ts,js}'),
    ],
    migrations: [
      resolve(packageSourceCodeDirPath, 'db/migrations/**.{ts,js}'),
    ],
    autoLoadEntities: true,
    migrationsTableName: 'migration',
    migrationsTransactionMode: 'all',
    migrationsRun: true,
    logger: dbLogger,
  }),
}
