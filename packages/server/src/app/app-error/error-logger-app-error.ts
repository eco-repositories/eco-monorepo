import { ServerError, type AppError } from './app-error.js'
import { type ErrorLogLevel, ErrorLogger } from './error-logger.abstract.js'

export class ErrorLoggerAppError extends ErrorLogger<AppError> {
  protected override getLogLevel(error: AppError): ErrorLogLevel {
    return error instanceof ServerError ? 'error' : 'warn'
  }

  protected override getSummary(error: AppError): string {
    return error.getHead()
  }

  protected override getDetails(error: AppError): readonly Api.HttpErrorResponseDetail[] {
    return error.getDetails({ publicOnly: false })
  }
}
