import { type JsonStringifiable } from '@/json-stringifiable/json-stringifiable.type.js'

export interface HttpErrorResponseDetail<Payload extends JsonStringifiable = JsonStringifiable> {
  readonly message: string
  readonly payload?: Payload
}

export interface HttpErrorResponseBody {
  readonly statusCode: number
  readonly status: string
  readonly errorId: string
  readonly errorCode?: string
  readonly message?: string
  readonly details?: readonly HttpErrorResponseDetail[]
}
