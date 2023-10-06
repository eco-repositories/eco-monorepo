import { type MiddlewareConsumer, Module, type NestModule, type DynamicModule } from '@nestjs/common'
import { CommentsModule } from '@/comments/comments.module.js'
import { ConfigModule } from '@/config/config.module.js'
import { DbModule } from '@/db/db.module.js'
import { HealthModule } from '@/health/health.module.js'
import { PostsModule } from '@/posts/posts.module.js'
import { UsersModule } from '@/users/users.module.js'
import { AppErrorFilter } from './app-error/app-error.filter.js'
import { DevModule } from './dev/dev.module.js'
import { HttpLoggerMiddleware } from './http-logger.middleware.js'
import { HttpRateLimiterMiddleware } from './http-rate-limiter.middleware.js'

/** @private */
interface RegisterParams {
  readonly importDevModule: boolean
}

@Module({
  imports: [
    ConfigModule,
    DbModule,
    HealthModule,
    CommentsModule,
    PostsModule,
    UsersModule,
  ],
  providers: [
    AppErrorFilter,
  ],
})
export class AppModule implements NestModule {
  static register({ importDevModule }: RegisterParams): DynamicModule {
    return {
      module: AppModule,
      imports: importDevModule ? [DevModule] : [],
    }
  }

  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(HttpLoggerMiddleware, HttpRateLimiterMiddleware)
      .forRoutes('*')
  }
}
