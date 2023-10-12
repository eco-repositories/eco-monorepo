import { HttpStatus } from '@nestjs/common'
import { ClientError, type AppError } from './app-error.js'

export function appErrorToHttpErrorResponseBody(error: AppError): Api.HttpErrorResponseBody {
  const statusCode = error.statusCode
  const status = HttpStatus[error.statusCode]
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
