import { toSetLikeOfKeys } from './to-set-like-of-keys.js'

describe(toSetLikeOfKeys.name, () => {
  it('should convert object to a set-like structure containing keys of the original object', () => {
    const object = {
      foo: 'bar',
      baz: 'qux',
    } as const

    const keysSet = toSetLikeOfKeys(object)

    expect(keysSet).toMatchObject({
      foo: 'foo',
      baz: 'baz',
    })
  })
})
