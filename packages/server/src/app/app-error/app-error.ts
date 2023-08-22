import { randomUUID } from 'crypto'
import { type JsonStringifiable } from '@@shared/json-stringifiable/json-stringifiable.type.js'

/** @private */
type Digit = `${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`

/** @private */
type ClientErrorStatusCode = `4${Digit}${Digit}`

/** @private */
type ServerErrorStatusCode = `5${Digit}${Digit}`

export interface Detail {
  readonly message: string
  readonly payload?: JsonStringifiable
}

/** @private */
interface DetailWithPublicity extends Detail {
  readonly public?: boolean
}

/** @private */
interface GetDetailsParams {
  readonly publicOnly?: boolean
}

export abstract class AppError extends globalThis.Error {
  readonly id = randomUUID()
  readonly code = this.constructor.name
  abstract readonly statusCode: ClientErrorStatusCode | ServerErrorStatusCode
  protected readonly details: Detail[] = []
  protected readonly detailsPublic: Detail[] = []

  addDetail({
    public: isPublic = false,
    ...detail
  }: DetailWithPublicity): this {
    this.details.push(detail)

    if (isPublic) {
      this.detailsPublic.push(detail)
    }

    return this
  }

  getHead(): string {
    return `${this.code} (${this.id}): ${this.message}`
  }

  getDetails({
    publicOnly = true,
  }: GetDetailsParams = {}): readonly Detail[] {
    const details = publicOnly ? this.detailsPublic : this.details
    const detailsCopy = details.slice()

    return detailsCopy
  }
}

export abstract class ClientError extends AppError {
  abstract override readonly statusCode: ClientErrorStatusCode
}

export abstract class ServerError extends AppError {
  abstract override readonly statusCode: ServerErrorStatusCode
}
