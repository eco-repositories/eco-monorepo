import { Global, Module } from "@nestjs/common"
import { CacheModule as NestCacheModule } from "@nestjs/cache-manager"
import KeyvRedis from "@keyv/redis"
import { ConfigService } from "#@/config/config.service.js"
import { CacheService } from "./cache.service.js"

@Global()
@Module({
  imports: [
    NestCacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        stores: [
          new KeyvRedis(config.getCacheUrl(), {
            throwOnConnectError: true,
            throwOnErrors: true,
          }),
        ],
      }),
    }),
  ],
  providers: [
    CacheService,
  ],
  exports: [
    NestCacheModule,
    CacheService,
  ],
})
export class CacheModule { }
