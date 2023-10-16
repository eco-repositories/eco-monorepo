import { randomUUID } from 'crypto'
import { getStatusByStatusCode } from './get-status-by-status-code.js'

/** @private */
const bodyExcerptStaticProps = {
  statusCode: '500',
  status: getStatusByStatusCode('500'), // "Internal Server Error"
  errorCode: 'UnexpectedError',
  message: 'An unexpected error occurred',
  details: [
    {
      message: 'Unfortunately, no further details are available',
    },
  ],
} satisfies Omit<Required<Api.HttpErrorResponseBody>, 'errorId'>

export function createUnexpectedHttpErrorResponseBody(): Api.HttpErrorResponseBody {
  return {
    ...bodyExcerptStaticProps,
    errorId: randomUUID(),
  }
}
