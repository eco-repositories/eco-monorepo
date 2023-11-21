export {}

const MOCK_RETURN_VALUE = 0.8817329200485058

globalThis.VITEST_MATH_RANDOM_MOCK_RETURN_VALUE = MOCK_RETURN_VALUE

declare global {
  // eslint-disable-next-line no-var
  var VITEST_MATH_RANDOM_MOCK_RETURN_VALUE: typeof MOCK_RETURN_VALUE
}

let mathRandom: typeof Math.random

beforeAll(() => {
  mathRandom = Math.random
})

beforeEach(() => {
  globalThis.Math.random = vi.fn(() => MOCK_RETURN_VALUE)
})

afterEach(() => {
  globalThis.Math.random = mathRandom
})
