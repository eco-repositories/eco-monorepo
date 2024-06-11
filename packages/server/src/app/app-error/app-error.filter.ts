import { Catch, type ArgumentsHost, HttpException } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { createLogger } from '@/common/create-logger.js'
import { AppError } from './app-error.js'
import { appErrorToHttpErrorResponseBody } from './app-error-to-http-error-response-body.js'
import { createUnexpectedHttpErrorResponseBody } from './create-unexpected-http-error-response-body.js'
import { ErrorLoggerAppError } from './error-logger-app-error.js'
import { ErrorLoggerHttpException } from './error-logger-http-exception.js'
import { httpExceptionToHttpErrorResponseBody } from './http-exception-to-http-error-response-body.js'

@Catch()
export class AppErrorFilter extends BaseExceptionFilter {
  protected readonly logger = createLogger(this.constructor.name)
  protected readonly errorLoggerAppError = new ErrorLoggerAppError(this.logger)
  protected readonly errorLoggerHttpException = new ErrorLoggerHttpException(this.logger)

  protected logCaught(caught: unknown): void {
    if (caught instanceof AppError) {
      this.errorLoggerAppError.log(caught)
    } else if (caught instanceof HttpException) {
      this.errorLoggerHttpException.log(caught)
    } else if (caught instanceof Error) {
      this.logger.error(caught.stack)
    } else {
      this.logger.error(caught)
    }
  }

  protected caughtToHttpErrorResponseBody(caught: unknown): Api.HttpErrorResponseBody {
    if (caught instanceof AppError) {
      return appErrorToHttpErrorResponseBody(caught)
    }

    if (caught instanceof HttpException) {
      return httpExceptionToHttpErrorResponseBody(caught)
    }

    this.logger.debug('An unexpected value was thrown that could not be converted to an HTTP error response body')

    return createUnexpectedHttpErrorResponseBody()
  }

  override catch(caught: unknown, host: ArgumentsHost): void {
    this.logCaught(caught)

    const body = this.caughtToHttpErrorResponseBody(caught)
    const exception = new HttpException(body, +body.statusCode)

    super.catch(exception, host)
  }
}
