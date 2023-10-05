import { type MiddlewareConsumer, Module, type NestModule } from '@nestjs/common'
import { ConfigModule } from '@/config/config.module.js'
import { DbModule } from '@/db/db.module.js'
import { HealthModule } from '@/health/health.module.js'
import { AppErrorFilter } from './app-error/app-error.filter.js'
import { HttpLoggerMiddleware } from './http-logger.middleware.js'
import { HttpRateLimiterMiddleware } from './http-rate-limiter.middleware.js'

@Module({
  imports: [
    ConfigModule,
    DbModule,
    HealthModule,
  ],
  providers: [
    AppErrorFilter,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(HttpLoggerMiddleware, HttpRateLimiterMiddleware)
      .forRoutes('*')
  }
}
