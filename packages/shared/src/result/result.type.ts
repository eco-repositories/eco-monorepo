/** @private */
interface ResultSuccess<Payload> {
  readonly success: true
  readonly payload: Payload
}

/** @private */
interface ResultFailureBase {
  readonly success: false
  readonly message: string
}

/** @private */
type ResultFailure<AnyError = undefined> = ResultFailureBase & ([undefined] extends [AnyError] ? {
  readonly payload?: unknown
} : {
  readonly payload: AnyError
})

export type Result<Value, AnyError = undefined> =
  | ResultSuccess<Value>
  | ResultFailure<AnyError>
