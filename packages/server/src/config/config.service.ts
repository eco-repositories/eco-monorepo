import { Injectable } from '@nestjs/common'
import { ConfigService as NestConfigService } from '@nestjs/config'
import { type ConfigDTO } from './config.dto.js'
import { EnvName } from './env-name.js'

/** @private */
type ConfigKey = keyof ConfigDTO

/** @private */
type Keys = {
  [Key in ConfigKey]: Key
}

@Injectable()
export class ConfigService extends NestConfigService<ConfigDTO, true> {
  public readonly keys: Keys = (() => {
    const config = this.getInternalConfigObject()
    const keysList = Object.keys(config)
    const keys = Object.fromEntries(keysList.map((key) => [key, key] as const))

    return keys as Keys
  })()

  protected getInternalConfigObject(): ConfigDTO {
    // @ts-expect-error: "`internalConfig` is private" (it should be protected really)
    return this.internalConfig._PROCESS_ENV_VALIDATED
  }

  public override get<Key extends ConfigKey>(key: Key): ConfigDTO[Key] {
    return super.get(key)
  }

  public isDevelopment(): boolean {
    return this.get(this.keys.NODE_ENV) === EnvName.development
  }
}
