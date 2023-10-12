import { Type } from 'class-transformer'
import { IsInt, IsOptional, IsPositive, Min } from 'class-validator'
import { type PaginationParams as PaginationParamsType } from '@@shared/pagination/pagination-params.type.js'

export const MIN_OFFSET = 0

export const MIN_LIMIT = 1

export class PaginationParams implements PaginationParamsType {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(MIN_OFFSET)
  readonly offset?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Min(MIN_LIMIT)
  readonly limit?: number
}
