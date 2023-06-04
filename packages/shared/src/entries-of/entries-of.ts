export function * entriesOf<O extends object>(object: O): IterableIterator<readonly [keyof O, O[keyof O]]> {
  for (const key in object) {
    yield [key, object[key]]
  }
}
