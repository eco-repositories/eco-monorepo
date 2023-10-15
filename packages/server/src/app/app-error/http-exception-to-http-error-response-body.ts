import { type HttpStatusCode } from '@@shared/api/http-status-code/http-status-code.type.js'
import { type HttpException } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { getHttpExceptionMessages } from './get-http-exception-messages.js'
import { getStatusByStatusCode } from './get-status-by-status-code.js'

export function httpExceptionToHttpErrorResponseBody(exception: HttpException): Api.HttpErrorResponseBody {
  const statusCodeNumber = exception.getStatus()
  const statusCode = statusCodeNumber.toString() as HttpStatusCode
  const status = getStatusByStatusCode(statusCode)
  const errorId = randomUUID()
  const messages = getHttpExceptionMessages(exception)
  const details = messages.map((message): Api.HttpErrorResponseDetail => ({ message }))

  return {
    statusCode,
    status,
    errorId,
    errorCode: exception.name,
    message: exception.message,
    details,
  }
}
