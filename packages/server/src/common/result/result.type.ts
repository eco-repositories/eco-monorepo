/** @private */
interface ResultSuccess<Value> {
  value: Value
  error?: never
}

/** @private */
interface ResultFailure<AnyError = unknown> {
  value?: never
  error: AnyError
}

export type Result<Value, AnyError = unknown> =
  | ResultSuccess<Value>
  | ResultFailure<AnyError>
