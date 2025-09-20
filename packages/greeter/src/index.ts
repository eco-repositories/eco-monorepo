import { Yields } from '#shared/microservices/action.type.js'
import { CommsBy } from '#shared/microservices/comms-by.type.js'
import { createPatterns } from '#shared/microservices/create-patterns.js'

export type Comms = CommsBy<{
  readonly greeter: {
    readonly greet: Yields<void, string>
  }
}>

export const { greeter } = createPatterns<Comms>()
