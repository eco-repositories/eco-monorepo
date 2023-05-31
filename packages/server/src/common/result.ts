// TODO: move to shared package

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

// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-redeclare
export namespace Result {
  export function from<Value, AnyError = unknown>(fn: () => Value): Result<Value, AnyError> {
    try {
      const value = fn()

      return { value }
    } catch (caught) {
      return {
        error: caught as AnyError,
      }
    }
  }

  export async function fromPromise<Value, AnyError = unknown>(promise: Promise<Value>): Promise<Result<Value, AnyError>> {
    try {
      const value = await promise

      return { value }
    } catch (caught) {
      return {
        error: caught as AnyError,
      }
    }
  }
}
