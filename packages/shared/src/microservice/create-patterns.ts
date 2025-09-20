import { CommsShape } from './comms-by.type.js'

export type Pattern<Namespace extends PropertyKey, Action extends PropertyKey> =
  `${Namespace & string}.${Action & string}`

type PatternsBy<Comms extends CommsShape> = {
  readonly [Namespace in keyof Comms]: {
    readonly [Action in keyof Comms[Namespace]]: Pattern<Namespace, Action>
  }
}

export function createPatterns<Comms extends CommsShape>(): PatternsBy<Comms> {
  const patterns = new Proxy({} as Record<PropertyKey, Record<PropertyKey, string>>, {
    get(target, namespace: PropertyKey) {
      if (typeof namespace !== 'string') {
        return target[namespace]
      }

      return target[namespace] ??= new Proxy({} as Record<PropertyKey, string>, {
        get(actionsTarget, action: PropertyKey) {
          if (typeof action !== 'string') {
            return target[action]
          }

          return actionsTarget[action] ??= `${namespace}.${action}`
        },
      })
    },
  })

  return patterns as PatternsBy<Comms>
}
