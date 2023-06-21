import { Type } from 'class-transformer'
import { IsInt, IsNotEmpty, IsPort, IsPositive, IsString, Min } from 'class-validator'
import { EnvName } from './env-name.js'
import { IsValidEnum } from './is-valid-enum.decorator.js'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends ConfigDTO {}
  }
}

export const MIN_RATE_LIMITER_TIMEFRAME_MSEC = 1
export const MIN_RATE_LIMITER_MAX_HITS_PER_TIMEFRAME = 1

export const defaults = {
  NODE_ENV: EnvName.production,
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
