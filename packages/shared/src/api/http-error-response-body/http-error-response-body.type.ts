import { type JsonStringifiable } from '@/json-stringifiable/json-stringifiable.type.js'
import { type HttpStatusCode } from '@/api/http-status-code/http-status-code.type.js'

export interface HttpErrorResponseDetail<Payload extends JsonStringifiable = JsonStringifiable> {
  readonly message: string
  readonly payload?: Payload
}

export interface HttpErrorResponseBody {
  readonly statusCode: HttpStatusCode
  readonly status: string
  readonly errorId: string
  readonly errorCode?: string
  readonly message?: string
  readonly details?: readonly HttpErrorResponseDetail[]
}
