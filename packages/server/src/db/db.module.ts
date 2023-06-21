import { Global, Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { createLogger } from '@/common/create-logger.js'
import { ConfigService } from '@/config/config.service.js'
import { DbHealthIndicator } from './db.health.js'

@Global()
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get(config.keys.DB_HOST),
        port: +config.get(config.keys.DB_PORT),
        username: config.get(config.keys.DB_USER),
        password: config.get(config.keys.DB_PASS),
        database: config.get(config.keys.DB_NAME),
        autoLoadModels: true,
        sync: {
          force: config.isDevelopment(),
        },
        logging(sql): void {
          DbModule.logger.debug(sql)
        },
      }),
    }),
  ],
  providers: [
    DbHealthIndicator,
  ],
  exports: [
    SequelizeModule,
    DbHealthIndicator,
  ],
})
export class DbModule {
  static readonly logger = createLogger(DbModule.name)
}
