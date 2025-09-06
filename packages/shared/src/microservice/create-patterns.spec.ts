import { Effect } from "./action.type.js"
import { CommsBy } from "./comms-by.type.js"
import { createPatterns } from "./create-patterns.js"

describe(createPatterns, () => {
  it('should create an object matching the provided Comms', () => {
    type Comms = CommsBy<{
      readonly foo: {
        readonly bar: Effect
      }
    }>

    const patterns = createPatterns<Comms>()

    expect(patterns).toMatchObject({
      foo: {
        bar: 'foo.bar',
      },
    })
  })
})
