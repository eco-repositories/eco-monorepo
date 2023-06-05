import { Injectable } from '@nestjs/common'
import { CustomHealthIndicator } from './custom-health-indicator.abstract.js'

@Injectable()
export class BasicHealthIndicator extends CustomHealthIndicator {
  protected override readonly statusKey: string = 'app'

  protected isHealthy(): boolean {
    return true
  }
}
