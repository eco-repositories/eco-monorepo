import { Global, Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigService } from '@/config/config.service.js'
import { DbHealthIndicator } from './db.health.js'
import { DbLoggerProvider, type DbLogger } from './db-logger.provider.js'

@Global()
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [ConfigService, DbLoggerProvider],
      useFactory: (config: ConfigService, dbLogger: DbLogger) => ({
        dialect: 'postgres',
        host: config.get(config.keys.DB_HOST),
        port: +config.get(config.keys.DB_PORT),
        username: config.get(config.keys.DB_USER),
        password: config.get(config.keys.DB_PASS),
        database: config.get(config.keys.DB_NAME),
        autoLoadModels: true,
        sync: {
          alter: config.isDevelopment(),
        },
        logging(sql): void {
          dbLogger.debug(sql)
        },
      }),
    }),
  ],
  providers: [
    DbHealthIndicator,
    DbLoggerProvider,
  ],
  exports: [
    SequelizeModule,
    DbHealthIndicator,
  ],
})
export class DbModule {}
