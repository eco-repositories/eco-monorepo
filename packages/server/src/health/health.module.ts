import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { BasicHealthIndicator } from './basic.health.js'
import { HealthController } from './health.controller.js'
import { HealthService } from './health.service.js'

@Module({
  imports: [
    TerminusModule.forRoot({
      errorLogStyle: 'pretty',
    }),
  ],
  providers: [
    BasicHealthIndicator,
    HealthService,
  ],
  controllers: [
    HealthController,
  ],
})
export class HealthModule {}
