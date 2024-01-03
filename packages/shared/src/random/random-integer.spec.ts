import { randomInteger } from './random-integer.js'

describe(randomInteger, () => {
  it('should return either 0 or 1 randomly by default', () => {
    expect(randomInteger()).toEqual(1)
  })

  it.each([
    [0, 0],
    [1, 1],
    [17, 15],
    [42, 37],
    [51, 45],
    [36, 32],
    [-3.14, -0],
  ])('should return a random integer between 0 and %s', (givenMax, expected) => {
    expect(randomInteger(givenMax)).toEqual(expected)
  })

  it.each([
    [0, 1, 1],
    [2, 17, 15],
    [17, 2, 15],
    [3, 42, 37],
    [42, 3, 37],
    [51, -3.14, 45],
    [-3.14, 51, 45],
    [-17, -42, -20],
    [-42, -17, -20],
  ])('should return a random integer between %s and %s (swapping the arguments, if needed)', (givenMax, givenMin, expected) => {
    expect(randomInteger(givenMax, givenMin)).toEqual(expected)
  })
})
