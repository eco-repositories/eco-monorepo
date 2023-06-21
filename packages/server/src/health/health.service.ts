import { Injectable } from '@nestjs/common'
import { type HealthCheckResult, HealthCheckService, type HealthIndicatorFunction } from '@nestjs/terminus'
import { BasicHealthIndicator } from './basic.health.js'
import { type CustomHealthIndicator } from './custom-health-indicator.abstract.js'

@Injectable()
export class HealthService {
  protected readonly healthIndicators: CustomHealthIndicator.WithCheckHealth[] = [
    this.basicHealth,
  ]

  protected readonly healthIndicatorFunctions: HealthIndicatorFunction[] =
    this.healthIndicators.map((indicator) => async () => await indicator.checkHealth())

  constructor(
    protected readonly healthCheckService: HealthCheckService,
    protected readonly basicHealth: BasicHealthIndicator,
  ) {}

  async getHealthCheck(): Promise<HealthCheckResult> {
    const healthCheck = await this.healthCheckService.check(this.healthIndicatorFunctions)

    return healthCheck
  }
}
