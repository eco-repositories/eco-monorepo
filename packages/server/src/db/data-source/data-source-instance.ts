import { Module } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DataSource } from 'typeorm'
import { ConfigModule } from '@/config/config.module.js'
import { DataSourceModule } from './data-source.module.js'
import { DATA_SOURCE_OPTIONS_PROVIDER, type DataSourceOptions } from './data-source-options.provider.js'

/** @private */
@Module({
  imports: [
    ConfigModule,
    DataSourceModule,
  ],
})
class TempModule {}

/** @private */
async function getDataSourceInstance(): Promise<DataSource> {
  const context = await NestFactory.createApplicationContext(TempModule, { logger: false })
  const dataSourceOptions = context.get<DataSourceOptions>(DATA_SOURCE_OPTIONS_PROVIDER)
  const dataSource = new DataSource(dataSourceOptions)

  await context.close()

  return dataSource
}

export default await getDataSourceInstance()
