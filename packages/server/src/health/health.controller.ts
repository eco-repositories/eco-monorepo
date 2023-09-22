import { Controller, Get } from '@nestjs/common'
import { HealthCheck } from '@nestjs/terminus'
import { HealthService } from './health.service.js'

@Controller('health')
export class HealthController {
  constructor(
    protected readonly healthService: HealthService,
  ) {}

  @Get()
  @HealthCheck()
  async checkHealth(): Promise<Api.HttpResponseBody<Api.HealthCheckResult>> {
    const healthCheck = await this.healthService.getHealthCheck()

    return {
      result: healthCheck,
    }
  }
}
