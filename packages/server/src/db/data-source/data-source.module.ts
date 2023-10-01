import { Module } from '@nestjs/common'
import { dataSourceOptionsProvider } from './data-source-options.provider.js'

@Module({
  providers: [
    dataSourceOptionsProvider,
  ],
  exports: [
    dataSourceOptionsProvider,
  ],
})
export class DataSourceModule {}
