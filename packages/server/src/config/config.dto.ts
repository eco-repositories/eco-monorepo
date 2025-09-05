import { Type } from 'class-transformer'
import { IsInt, IsNotEmpty, IsPort, IsPositive, IsString, Matches, Min } from 'class-validator'
import { EnvName } from '#shared/config/env-name.js'
import { IsValidEnum } from '#shared/is-valid-enum/is-valid-enum.decorator.js'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv extends Record<keyof ConfigDTO, string> {}
  }
}

export const MIN_RATE_LIMITER_TIMEFRAME_MSEC = 1
export const MIN_RATE_LIMITER_MAX_HITS_PER_TIMEFRAME = 1

export const defaults = {
  NODE_ENV: EnvName.production,
  CACHE_PROTOCOL: 'redis',
  CACHE_USER: 'default',
  PORT: '3000',
  RATE_LIMITER_TIMEFRAME_MSEC: 1000,
  RATE_LIMITER_MAX_HITS_PER_TIMEFRAME: 5,
} satisfies Partial<ConfigDTO>

export class ConfigDTO {
  @IsValidEnum(EnvName)
  readonly NODE_ENV: EnvName = defaults.NODE_ENV

  @IsString()
  @IsNotEmpty()
  readonly DB_HOST!: string

  @IsPort()
  readonly DB_PORT!: string

  @IsString()
  @IsNotEmpty()
  readonly DB_NAME: string = this.NODE_ENV // yes, "this"; by default, each environment is connected to its own database

  @IsString()
  @IsNotEmpty()
  readonly DB_USER!: string

  @IsString()
  @IsNotEmpty()
  readonly DB_PASS!: string

  @IsString()
  @Matches(/^rediss?$/)
  readonly CACHE_PROTOCOL: string = defaults.CACHE_PROTOCOL

  @IsString()
  @IsNotEmpty()
  readonly CACHE_HOST!: string

  @IsPort()
  readonly CACHE_PORT!: string

  @IsString() // can be empty
  readonly CACHE_USER: string = defaults.CACHE_USER

  @IsString()
  @IsNotEmpty()
  readonly CACHE_PASS!: string

  @IsPort()
  readonly PORT: string = defaults.PORT

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Min(MIN_RATE_LIMITER_TIMEFRAME_MSEC)
  readonly RATE_LIMITER_TIMEFRAME_MSEC: number =
    defaults.RATE_LIMITER_TIMEFRAME_MSEC

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Min(MIN_RATE_LIMITER_MAX_HITS_PER_TIMEFRAME)
  readonly RATE_LIMITER_MAX_HITS_PER_TIMEFRAME: number =
    defaults.RATE_LIMITER_MAX_HITS_PER_TIMEFRAME
}
