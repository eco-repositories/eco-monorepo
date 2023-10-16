import { type Pagination } from './pagination.type.js'

export interface ListPaginated<Item> {
  readonly items: Item[]
  readonly pagination: Pagination
}
