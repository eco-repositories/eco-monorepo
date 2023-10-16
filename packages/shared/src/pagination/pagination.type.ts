import { type PaginationParams } from './pagination-params.type.js'

export interface Pagination extends Required<PaginationParams> {
  readonly totalCount: number
}
