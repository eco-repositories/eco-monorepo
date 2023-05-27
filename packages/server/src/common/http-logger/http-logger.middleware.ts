import { Injectable, type NestMiddleware } from '@nestjs/common'
import morgan from 'morgan'
import { createLogger } from '@/common/create-logger/create-logger.js'

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  protected readonly logger = createLogger(this.constructor.name)

  protected readonly implementation = morgan('dev', {
    stream: {
      write: (message) => {
        const log = message.trim()

        this.logger.log(log)
      },
    },
  })

  use(...args: Parameters<typeof this.implementation>): void {
    this.implementation(...args)
  }
}
