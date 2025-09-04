import { Module } from '@nestjs/common'
import { dataSourceOptionsProvider } from './data-source-options.provider.js'
import { DbLogger } from './db-logger.js'

@Module({
  providers: [
    DbLogger,
    dataSourceOptionsProvider,
  ],
  exports: [
    dataSourceOptionsProvider,
  ],
})
export class DataSourceModule {}
