import { Module } from '@nestjs/common'
import { ConfigModule } from '#@/config/config.module.js'
import { dataSourceOptionsProvider } from './data-source-options.provider.js'
import { DbLogger } from './db-logger.js'

@Module({
  imports: [
    ConfigModule,
  ],
  providers: [
    DbLogger,
    dataSourceOptionsProvider,
  ],
  exports: [
    dataSourceOptionsProvider,
  ],
})
export class DataSourceModule {}
