import { Observable } from "rxjs"
import { InputOf, OutputOf } from "./action.type.js"
import { CommsShape } from "./comms-by.type.js"
import { Pattern } from "./create-patterns.js"

type __Args<Comms extends CommsShape, Namespace extends keyof Comms, Action extends keyof Comms[Namespace]> = [
  pattern: Pattern<Namespace, Action>,
  ...data: InputOf<Comms[Namespace][Action]> extends void ? [] : [InputOf<Comms[Namespace][Action]>]
]

export interface Microservice<Comms extends CommsShape> {
  send<N extends keyof Comms, A extends keyof Comms[N]>(...args: __Args<Comms, N, A>): Observable<OutputOf<Comms[N][A]>>
  emit<N extends keyof Comms, A extends keyof Comms[N]>(...args: __Args<Comms, N, A>): void
}

export { Microservice as µService }
