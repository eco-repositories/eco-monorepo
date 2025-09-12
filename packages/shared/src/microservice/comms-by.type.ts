import { Effect, Yields } from "./action.type.js"

export type CommsShape = {
  readonly [namespace: string]: {
    readonly [action: string]: Effect | Yields<never, unknown>
  }
}

// prevents confusion when Comms is defined as an interface (it won't work)
export type CommsBy<Comms extends CommsShape> = Comms
