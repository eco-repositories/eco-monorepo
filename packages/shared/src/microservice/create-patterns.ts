import { CommsShape } from "./comms-by.type.js"

export type Pattern<Namespace extends PropertyKey, Action extends PropertyKey> =
  `${Namespace & string}.${Action & string}`

type PatternsBy<Comms extends CommsShape> = {
  readonly [Namespace in keyof Comms]: {
    readonly [Action in keyof Comms[Namespace]]: Pattern<Namespace, Action>
  }
}

export function createPatterns<Comms extends CommsShape>(): PatternsBy<Comms> {
  const patterns = new Proxy({} as Record<string, Record<string, string>>, {
    get(target, namespace: string) {
      return target[namespace] ??= new Proxy({} as Record<string, string>, {
        get(actionsTarget, action: string) {
          return actionsTarget[action] ??= `${namespace}.${action}`
        },
      })
    },
  })

  return patterns as PatternsBy<Comms>
}
