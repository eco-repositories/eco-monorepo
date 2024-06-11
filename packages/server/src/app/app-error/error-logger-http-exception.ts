import { type HttpException } from '@nestjs/common'
import { type ErrorLogLevel, ErrorLogger } from './error-logger.abstract.js'
import { getHttpExceptionMessages } from './get-http-exception-messages.js'

export class ErrorLoggerHttpException extends ErrorLogger<HttpException> {
  protected override getLogLevel(exception: HttpException): ErrorLogLevel {
    return exception.getStatus() >= 500 ? 'error' : 'warn'
  }

  protected override getSummary(exception: HttpException): string {
    return `${exception.name}: ${exception.message}`
  }

  protected override getDetails(exception: HttpException): readonly Api.HttpErrorResponseDetail[] {
    return getHttpExceptionMessages(exception).map((message) => ({ message }))
  }
}
