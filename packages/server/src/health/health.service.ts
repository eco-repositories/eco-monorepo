import { Injectable } from '@nestjs/common'
import { HealthCheckService, type HealthIndicatorFunction } from '@nestjs/terminus'
import { DbHealthIndicator } from '@/db/db.health.js'
import { BasicHealthIndicator } from './basic.health.js'
import { type CustomHealthIndicator } from './custom-health-indicator.abstract.js'

@Injectable()
export class HealthService {
  protected readonly healthIndicators: CustomHealthIndicator.WithCheckHealth[] = [
    this.basicHealth,
    this.dbHealth,
  ]

  protected readonly healthIndicatorFunctions: HealthIndicatorFunction[] =
    this.healthIndicators.map((indicator) => async () => await indicator.checkHealth())

  constructor(
    protected readonly healthCheckService: HealthCheckService,
    protected readonly basicHealth: BasicHealthIndicator,
    protected readonly dbHealth: DbHealthIndicator,
  ) {}

  async getHealthCheck(): Promise<Api.HealthCheckResult> {
    const healthCheck = await this.healthCheckService.check(this.healthIndicatorFunctions)

    return healthCheck
  }
}
