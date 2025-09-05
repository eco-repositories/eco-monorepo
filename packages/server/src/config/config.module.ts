import { Global, Module } from '@nestjs/common'
import { ConfigModule as SharedConfigModule } from '#shared/config/config.module.js'
import { ConfigDTO } from './config.dto.js'
import { ConfigService } from './config.service.js'

@Global()
@Module({
  imports: [
    SharedConfigModule.forRoot(ConfigDTO, {
      envFileUrl: new URL('../../.env.local', import.meta.url),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
