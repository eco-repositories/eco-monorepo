import { IsPort } from "class-validator"
import { EnvName } from "@@shared/microservice/config/env-name.js"
import { IsValidEnum } from "@@shared/is-valid-enum/is-valid-enum.decorator.js"

export const defaults = {
  NODE_ENV: EnvName.production,
  PORT: '3011',
} satisfies Partial<ConfigDTO>

export class ConfigDTO {
  @IsValidEnum(EnvName)
  readonly NODE_ENV: EnvName = defaults.NODE_ENV

  @IsPort()
  readonly PORT: string = defaults.PORT
}
