export function random(max = 1, min = 0): number {
  return Math.random() * (Math.max(max, min) - (min = (Math.min(max, min)))) + min
}
