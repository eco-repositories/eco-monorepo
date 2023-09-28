import { type MockedFunction } from 'vitest'
import { randomChoice } from './random-choice.js'

describe(randomChoice.name, () => {
  it.each([
    ['d', ['a', 'b', 'c', 'd', 'e'], 3 / 5],
    [17, [17, 42, 51, -Math.PI], 0 / 4],
  ])('should return %s', (itemExpected, items: Array<string | number>, mockRandomValue) => {
    (Math.random as MockedFunction<() => number> /* because it is mocked already */)
      .mockImplementationOnce(() => mockRandomValue)

    expect(randomChoice(items)).toBe(itemExpected)
  })
})
