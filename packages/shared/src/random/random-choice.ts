import { random } from './random.js'

/** @private */
interface IndexedList<Value> {
  readonly [index: number]: Value
  readonly length: number
}

export function randomChoice<const Value>(values: IndexedList<Value>): Value {
  const index = Math.floor(random(values.length))
  const value = values[index]

  return value
}
