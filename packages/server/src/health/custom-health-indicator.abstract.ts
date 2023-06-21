import { HealthIndicator, type HealthIndicatorResult } from '@nestjs/terminus'

export abstract class CustomHealthIndicator<
  Data extends object | undefined = undefined,
> extends HealthIndicator implements CustomHealthIndicator.WithCheckHealth {
  protected abstract readonly statusKey: string

  protected abstract isHealthy(): boolean | PromiseLike<boolean>

  protected getData(): Data | PromiseLike<Data> {
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

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CustomHealthIndicator {
  export interface WithCheckHealth {
    // eslint-disable-next-line @typescript-eslint/method-signature-style
    checkHealth(): HealthIndicatorResult | PromiseLike<HealthIndicatorResult>
  }
}
