import { type Digit } from '@@shared/digit/digit.type.js'
import { randomUUID } from 'crypto'

/** @private */
type ClientErrorStatusCode = `4${Digit}${Digit}`

/** @private */
type ServerErrorStatusCode = `5${Digit}${Digit}`

export abstract class AppError extends globalThis.Error {
  readonly id = randomUUID()
  readonly code = this.constructor.name
  abstract readonly statusCode: ClientErrorStatusCode | ServerErrorStatusCode
  protected readonly details: string[] = []

  addDetail(detail: string): this {
    this.details.push(detail)

    return this
  }

  getHead(): string {
    return `${this.code} (${this.id}): ${this.message}`
  }

  getDetails(): readonly string[] {
    return this.details
  }
}

export abstract class ClientError extends AppError {
  abstract override readonly statusCode: ClientErrorStatusCode
}

export abstract class ServerError extends AppError {
  abstract override readonly statusCode: ServerErrorStatusCode
}
