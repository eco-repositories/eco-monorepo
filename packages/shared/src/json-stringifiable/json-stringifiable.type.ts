export type JsonStringifiable =
  | string | number | boolean
  | null
  | JsonStringifiable[]
  | { [key: string | number]: JsonStringifiable }
