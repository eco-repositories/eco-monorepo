import { randomUUID } from 'crypto'
import {
  type HttpStatusCodeError,
  type HttpStatusCodeErrorClient,
  type HttpStatusCodeErrorServer,
} from '@@shared/api/http-status-code/http-status-code.type.js'

/** @private */
type Detail = Api.HttpErrorResponseDetail // alias

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
  abstract readonly statusCode: HttpStatusCodeError
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

  addDetailIf(condition: boolean, getDetail: () => DetailWithPublicity): this {
    if (condition) {
      this.addDetail(getDetail())
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
  abstract override readonly statusCode: HttpStatusCodeErrorClient
}

export abstract class ServerError extends AppError {
  abstract override readonly statusCode: HttpStatusCodeErrorServer
}
