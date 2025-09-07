import { Global, Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { resolvePath } from 'shared/resolve-path/resolve-path.js'
import { ConfigService } from './config.service.js'
import { validateConfig } from './validate-config.js'

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: [
        resolvePath(import.meta.url, '../..', '.env.local'),
      ],
      validate: validateConfig,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
