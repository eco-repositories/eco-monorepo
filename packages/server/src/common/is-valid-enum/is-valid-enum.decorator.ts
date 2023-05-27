import { IsEnum, type ValidationOptions } from 'class-validator'

/** @private */
const listViewOf = (enumObject: object): string =>
  Object.values(enumObject)
    .map((item: string | number) => `'${item}'`)
    .join(', ')

export const IsValidEnum = (
  enumObject: object,
  options?: ValidationOptions,
): PropertyDecorator =>
  IsEnum(enumObject, {
    ...options,
    message: options?.message ?? `Valid values of $property are: ${listViewOf(enumObject)}`,
  })
