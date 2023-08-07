/** @private */
interface ResultSuccess<Payload> {
  success: true
  payload: Payload
}

/** @private */
interface ResultFailureBase {
  success: false
  message: string
}

/** @private */
type ResultFailure<AnyError = undefined> = ResultFailureBase & ([undefined] extends [AnyError] ? {
  payload?: AnyError
} : {
  payload: AnyError
})

export type Result<Value, AnyError = undefined> =
  | ResultSuccess<Value>
  | ResultFailure<AnyError>
