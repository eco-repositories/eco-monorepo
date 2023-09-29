import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@/config/config.service.js'
import { DbHealthIndicator } from './db.health.js'
import { DbLogger } from './db-logger.js'

/** @private */
const dbLogger = new DbLogger()

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get(config.keys.DB_HOST),
        port: +config.get(config.keys.DB_PORT),
        username: config.get(config.keys.DB_USER),
        password: config.get(config.keys.DB_PASS),
        database: config.get(config.keys.DB_NAME),
        autoLoadEntities: true,
        synchronize: config.isDevelopment(),
        logger: dbLogger,
      }),
    }),
  ],
  providers: [
    DbHealthIndicator,
  ],
  exports: [
    TypeOrmModule,
    DbHealthIndicator,
  ],
})
export class DbModule extends TypeOrmModule {}
