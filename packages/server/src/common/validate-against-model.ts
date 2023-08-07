import { type ClassConstructor, type ClassTransformOptions, plainToInstance } from 'class-transformer'
import { validateSync, type ValidationError, type ValidatorOptions } from 'class-validator'
import { type Result } from '@@shared/result/result.type.js'
import { entriesOf } from '@@shared/entries-of/entries-of.js'

/** @private */
interface Params {
  transform?: ClassTransformOptions
  validate?: ValidatorOptions
}

export function validateAgainstModel<ModelType extends object>(
  Model: ClassConstructor<ModelType>,
  plain: object,
  params?: Params,
): Result<ModelType, ValidateAgainstModelAggregateError<ModelType>> {
  const model = plainToInstance(Model, plain, params?.transform)
  const errors = validateSync(model, params?.validate)

  if (errors.length > 0) {
    const aggregateError =
      new ValidateAgainstModelAggregateError(Model, errors[0].target, errors)

    return {
      success: false,
      message: aggregateError.message,
      payload: aggregateError,
    }
  }

  return {
    success: true,
    payload: model,
  }
}

/** @private */
function collectMessages(
  errors: ValidationError[],
  messages: string[] = [],
): string[] {
  for (const error of errors) {
    if (error.constraints) {
      const constraints = entriesOf(error.constraints)
      const newMessages = Array.from(constraints, ([, message]) => `[${error.property}] ${message}`)

      messages.push(...newMessages)
    }

    if (error.children) {
      collectMessages(error.children, messages)
    }
  }

  return messages
}

export class ValidateAgainstModelAggregateError<
  ModelType extends object,
> extends Error {
  public readonly messages = collectMessages(this.validationErrors)

  constructor(
    public readonly modelConstructor: ClassConstructor<ModelType>,
    public readonly validationTarget: unknown,
    public readonly validationErrors: ValidationError[],
  ) {
    const modelName = modelConstructor.name || '<anonymous class>'

    super(`Could not validate object against a model '${modelName}'`)
  }
}
