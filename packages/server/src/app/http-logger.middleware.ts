import { Injectable, type NestMiddleware } from '@nestjs/common'
import morgan from 'morgan'
import { createLogger } from '@/common/create-logger.js'

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  protected readonly logger = createLogger(this.constructor.name)
  protected readonly log = (message: string): void => {
    const log = message.trim()

    this.logger.log(log)
  }

  use = morgan('dev', {
    stream: {
      write: this.log,
    },
  })
}
