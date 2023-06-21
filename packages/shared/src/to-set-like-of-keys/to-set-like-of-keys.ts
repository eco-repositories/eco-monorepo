import { entriesOf } from '@/entries-of/entries-of.js'

export type SetLike<Item extends PropertyKey> = {
  [I in Item]: I
}

export function toSetLikeOfKeys<O extends object>(object: O): SetLike<keyof O> {
  const keysSet = Object.create(null)

  for (const [key] of entriesOf(object)) {
    keysSet[key] = key
  }

  return keysSet
}
