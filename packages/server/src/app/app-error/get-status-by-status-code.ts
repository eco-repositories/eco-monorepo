import { HttpStatus } from '@nestjs/common'
import { STATUS_CODES } from 'http'
import { type HttpStatusCode } from '@@shared/api/http-status-code/http-status-code.type.js'

/** @private */
const unknownStatus = 'UNKNOWN'

export function getStatusByStatusCode(statusCode: HttpStatusCode): string {
  return STATUS_CODES[statusCode] ?? HttpStatus[statusCode] ?? unknownStatus
}
