import { HttpStatus } from '@nestjs/common'
import { randomUUID } from 'crypto'

export function createUnexpectedHttpErrorResponseBody(): Api.HttpErrorResponseBody {
  return {
    statusCode: '500',
    status: HttpStatus[500],
    errorId: randomUUID(),
    errorCode: 'UnexpectedError',
    message: 'An unexpected error occurred',
    details: [
      {
        message: 'For security reasons, no further details are available',
      },
    ],
  }
}
