import { HealthIndicator, type HealthIndicatorResult } from '@nestjs/terminus'

/** @private */
type CustomHealthIndicatorDataConstraint = Record<string, unknown> | undefined

export abstract class CustomHealthIndicator<Data extends CustomHealthIndicatorDataConstraint = undefined> extends HealthIndicator {
  protected abstract readonly statusKey: string

  protected abstract isHealthy(): boolean | Promise<boolean>

  protected getData(): Data | Promise<Data> {
    return undefined as Data
  }

  async checkHealth(): Promise<HealthIndicatorResult> {
    const key = this.statusKey
    const isHealthy = await this.isHealthy()
    const data = await this.getData()
    const result = this.getStatus(key, isHealthy, data)

    return result
  }
}
