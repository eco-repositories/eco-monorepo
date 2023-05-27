import { type MiddlewareConsumer, Module, type NestModule } from '@nestjs/common'
import { ConfigModule } from './config/config.module.js'
import { HttpExceptionFilter } from './common/http-exception/http-exception.filter.js'
import { HttpLoggerMiddleware } from './common/http-logger/http-logger.middleware.js'
import { HttpRateLimiterMiddleware } from './common/http-rate-limiter/http-rate-limiter.middleware.js'

@Module({
  imports: [
    ConfigModule,
  ],
  providers: [
    HttpExceptionFilter,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(HttpLoggerMiddleware, HttpRateLimiterMiddleware)
      .forRoutes('*')
  }
}
