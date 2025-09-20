interface Action<in Input, out Output> {
  (input: Input): Output
}

type ActionUnknown = Action<never, unknown>

export type InputOf<A extends ActionUnknown> =
  A extends Action<infer Input, unknown> ? Input : never

export type OutputOf<A extends ActionUnknown> =
  A extends Action<never, infer Output> ? Output : unknown

declare const HasOutput: unique symbol

export interface Effect<in Input = never> extends Action<Input, void> {
  readonly [HasOutput]: false
}

export interface Yields<in Input, out Output> extends Action<Input, Output> {
  readonly [HasOutput]: true
}
