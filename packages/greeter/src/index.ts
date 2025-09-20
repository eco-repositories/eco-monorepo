import { Yields } from '#shared/microservice/action.type.js'
import { CommsBy } from '#shared/microservice/comms-by.type.js'
import { createPatterns } from '#shared/microservice/create-patterns.js'

export type Comms = CommsBy<{
  readonly greeter: {
    readonly greet: Yields<void, string>
  }
}>

export const { greeter } = createPatterns<Comms>()
