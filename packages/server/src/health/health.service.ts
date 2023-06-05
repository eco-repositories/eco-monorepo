import { Injectable } from '@nestjs/common'
import { type HealthCheckResult, HealthCheckService } from '@nestjs/terminus'
import { BasicHealthIndicator } from './basic.health.js'

@Injectable()
export class HealthService {
  constructor(
    protected readonly healthCheckService: HealthCheckService,
    protected readonly basicHealth: BasicHealthIndicator,
  ) {}

  async getHealthCheck(): Promise<HealthCheckResult> {
    const healthCheck = await this.healthCheckService.check([
      async () => await this.basicHealth.checkHealth(),
    ])

    return healthCheck
  }
}
