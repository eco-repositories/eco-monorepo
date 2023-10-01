import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DbHealthIndicator } from './db.health.js'
import { DataSourceModule } from './data-source/data-source.module.js'
import { DATA_SOURCE_OPTIONS_PROVIDER, type DataSourceOptions } from './data-source/data-source-options.provider.js'

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DataSourceModule],
      inject: [DATA_SOURCE_OPTIONS_PROVIDER],
      useFactory: (options: DataSourceOptions) => options,
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
