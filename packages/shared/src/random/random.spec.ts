import { random } from './random.js'

describe(random.name, () => {
  it('should return a random number between 0 and 1 by default', () => {
    expect(random()).toEqual(VITEST_MATH_RANDOM_MOCK_RETURN_VALUE)
  })

  it.each([
    [0, 0],
    [1, VITEST_MATH_RANDOM_MOCK_RETURN_VALUE],
    [17, 14.989459640824599],
    [42, 37.03278264203724],
    [51, 44.968378922473796],
    [36, 31.74238512174621],
    [-3.14, -0.37135863104769173],
  ])('should return a random number between 0 and %s', (givenMax, expected) => {
    expect(random(givenMax)).toEqual(expected)
  })

  it.each([
    [0, 1, VITEST_MATH_RANDOM_MOCK_RETURN_VALUE],
    [2, 17, 15.225993800727586],
    [17, 2, 15.225993800727586],
    [3, 42, 37.38758388189173],
    [42, 3, 37.38758388189173],
    [51, -3.14, 44.597020291426105],
    [-3.14, 51, 44.597020291426105],
    [-17, -42, -19.956676998787355],
    [-42, -17, -19.956676998787355],
  ])('should return a random number between %s and %s (swapping the arguments, if needed)', (givenMax, givenMin, expected) => {
    expect(random(givenMax, givenMin)).toEqual(expected)
  })
})
