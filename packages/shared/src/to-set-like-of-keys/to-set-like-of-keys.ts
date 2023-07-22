import { entriesOf } from '@/entries-of/entries-of.js'

export type SetLikeOfKeys<O extends object> = {
  [Key in keyof O]: Key
}

export function toSetLikeOfKeys<O extends object>(object: O): SetLikeOfKeys<O> {
  const keysSet = Object.create(null)

  for (const [key] of entriesOf(object)) {
    keysSet[key] = key
  }

  return keysSet
}
