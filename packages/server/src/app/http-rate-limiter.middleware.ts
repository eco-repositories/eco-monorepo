import { HttpStatus, Injectable, type NestMiddleware } from '@nestjs/common'
import { rateLimit } from 'express-rate-limit'
import { ConfigService } from '@/config/config.service.js'

@Injectable()
export class HttpRateLimiterMiddleware implements NestMiddleware {
  constructor(
    protected readonly config: ConfigService,
  ) {}

  use = rateLimit({
    windowMs: this.config.get(this.config.keys.RATE_LIMITER_TIMEFRAME_MSEC),
    max: this.config.get(this.config.keys.RATE_LIMITER_MAX_HITS_PER_TIMEFRAME),
    standardHeaders: true,
    legacyHeaders: false,
    handler(req, res) {
      res.sendStatus(this.statusCode ?? HttpStatus.TOO_MANY_REQUESTS)
    },
  })
}
