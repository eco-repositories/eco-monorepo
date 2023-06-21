import { Injectable } from '@nestjs/common'
import { type HealthIndicatorResult, SequelizeHealthIndicator, type SequelizePingCheckSettings } from '@nestjs/terminus'
import { type CustomHealthIndicator } from '@/health/custom-health-indicator.abstract.js'

@Injectable()
export class DbHealthIndicator extends SequelizeHealthIndicator implements CustomHealthIndicator.WithCheckHealth {
  protected readonly statusKey: string = 'db'
  protected readonly pingCheckOptions: SequelizePingCheckSettings = {
    timeout: 2000,
  }

  async checkHealth(): Promise<HealthIndicatorResult> {
    const result = await this.pingCheck(this.statusKey, this.pingCheckOptions)

    return result
  }
}
