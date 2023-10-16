import { type Pagination } from '@/pagination/pagination.type.js'

export interface HttpResponseBody<Result> {
  readonly result: Result
}

export interface HttpResponseBodyList<Item> extends HttpResponseBody<Item[]> {}

export interface HttpResponseBodyListPaginated<Item> extends HttpResponseBodyList<Item> {
  readonly pagination: Pagination
}
