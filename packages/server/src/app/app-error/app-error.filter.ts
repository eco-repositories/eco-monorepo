import { Catch, type ArgumentsHost, HttpException } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { createLogger } from '@/common/create-logger.js'
import { AppError } from './app-error.js'
import { ErrorLoggerAppError } from './error-logger-app-error.js'
import { ErrorLoggerHttpException } from './error-logger-http-exception.js'

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

  private appErrorToHttpErrorResponseBody(error: AppError): Api.HttpErrorResponseBody {
    const statusCode = +error.statusCode
    const status = HttpStatus[statusCode]
    const errorId = error.id

    if (error instanceof ClientError) {
      return {
        statusCode,
        status,
        errorId,
        errorCode: error.code,
        message: error.message,
        details: error.getDetails(),
      }
    }

    return {
      statusCode,
      status,
      errorId,
    }
  }

  protected caughtToHttpException(caught: unknown): HttpException {
    if (caught instanceof HttpException) {
      return caught
    }

    if (!(caught instanceof AppError)) {
      // No other info here, since it might be sensitive.
      // The assumption is that `caught` is properly logged.
      return new InternalServerErrorException()
    }

    const body = this.appErrorToHttpErrorResponseBody(caught)
    const exception = new HttpException(body, +body.statusCode)

    return exception
  }

  override catch(caught: unknown, host: ArgumentsHost): void {
    this.logCaught(caught)

    const exception = this.caughtToHttpException(caught)

    super.catch(exception, host)
  }
}
