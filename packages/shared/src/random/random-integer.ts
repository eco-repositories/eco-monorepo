import { random } from './random.js'

export function randomInteger(max?: number, min?: number): number {
  return Math.round(random(max, min))
}
