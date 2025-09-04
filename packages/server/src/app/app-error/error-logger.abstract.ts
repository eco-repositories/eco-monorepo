import { type JsonStringifiable } from '@@libs/@eco/utils/json-stringifiable/json-stringifiable.type.js'
import { createLogger } from '@/common/create-logger.js'

export type ErrorLogLevel = 'error' | 'warn'

export abstract class ErrorLogger<E extends Error> {
  constructor(
    protected readonly logger = createLogger(new.target),
  ) {}

  protected abstract getLogLevel(error: E): ErrorLogLevel
  protected abstract getSummary(error: E): string

  protected stringifyDetailPayload(payload: JsonStringifiable): string {
    return JSON.stringify(payload, null, 2)
  }

  protected getDetails(error: E): readonly Api.HttpErrorResponseDetail[] {
    return []
  }

  log(error: E): void {
    const logLevel = this.getLogLevel(error)
    const log = this.logger[logLevel].bind(this.logger)
    const summary = this.getSummary(error)

    log(summary)

    for (const { message, payload } of this.getDetails(error)) {
      log(`\t- ${message}`)

      // `null` is allowed
      if (typeof payload !== 'undefined') {
        const payloadString = this.stringifyDetailPayload(payload)

        log(payloadString)
      }
    }

    if (logLevel === 'error') {
      log(error.stack)
    }
  }
}
