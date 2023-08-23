import { entriesOf } from './entries-of.js'

describe(entriesOf.name, () => {
  it('should iterate over entries of the given object without creating an array', () => {
    const iterator = entriesOf({
      foo: 'bar',
      baz: 'qux',
    })

    expect(iterator).toHaveProperty('next', expect.any(Function))

    expect(iterator.next()).toMatchObject({
      value: ['foo', 'bar'],
      done: false,
    })

    expect(iterator.next()).toMatchObject({
      value: ['baz', 'qux'],
      done: false,
    })

    expect(iterator.next()).toMatchObject({
      value: undefined,
      done: true,
    })
  })
})
