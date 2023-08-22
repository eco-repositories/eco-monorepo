export type JsonStringifiable =
  | string | number | boolean
  | null
  | JsonStringifiable[]
  | { [key: PropertyKey]: JsonStringifiable }
