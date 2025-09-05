import { SetMetadata, applyDecorators, Header } from '@nestjs/common'

export const DEPRECATION = Symbol('Deprecation')

type DateInput = Date | string | number

/**
 * @see https://datatracker.ietf.org/doc/html/rfc8594 – `Sunset` header
 * @see https://datatracker.ietf.org/doc/html/rfc9745 – `Deprecation` header
 */
export function Deprecation(dateInput?: DateInput): MethodDecorator {
  let date: Date | null = null
  let valueSunset = 'true'
  let valueDeprecation = 'true'

  if (dateInput != null) {
    date = new Date(dateInput)

    const time = date.getTime()

    if (Number.isNaN(time)) {
      throw new DeprecationDateInputInvalidError(dateInput)
    }

    valueSunset = date.toUTCString()
    valueDeprecation = `@${Math.floor(time / 1000)}`
  }

  return applyDecorators(
    Header('Sunset', valueSunset),
    Header('Deprecation', valueDeprecation),
    SetMetadata(DEPRECATION, date),
  )
}

export class DeprecationDateInputInvalidError extends Error {
  constructor(public readonly dateInput: DateInput) {
    super(`Cannot create a valid date out of the input ${dateInput}`)
  }
}
