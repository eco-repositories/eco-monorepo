import { Global, Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { fileURLToPath } from 'url'
import { ConfigService } from './config.service.js'
import { validateConfig } from './validate-config.js'

/** @private */
const envFileUrl = new URL('../../.env.local', import.meta.url)

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: [
        fileURLToPath(envFileUrl),
      ],
      validate: validateConfig,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
