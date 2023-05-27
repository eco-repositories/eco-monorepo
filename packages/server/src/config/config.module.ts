import { Global, Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { resolve } from 'path'
import { ConfigService } from './config.service.js'
import { validateConfig } from './validate-config.js'

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: [
        resolve(import.meta.url, '../..', '.env.local'),
      ],
      validate: validateConfig,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
