import { Injectable } from '@nestjs/common'
import { HealthIndicator, type HealthIndicatorResult } from '@nestjs/terminus'

@Injectable()
export class BasicHealthIndicator extends HealthIndicator {
  protected readonly statusKey: string = 'app'

  async isHealthy(): Promise<HealthIndicatorResult> {
    const status = this.getStatus(this.statusKey, true)

    return status
  }
}
