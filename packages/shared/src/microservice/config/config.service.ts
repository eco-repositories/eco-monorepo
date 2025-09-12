import { Injectable } from '@nestjs/common'
import { ConfigService as NestConfigService } from '@nestjs/config'
import { type SetLikeOfKeys, toSetLikeOfKeys } from '#utils/to-set-like-of-keys/to-set-like-of-keys.js'
import { EnvName } from './env-name.js'

/** @deprecated Copy-pasted from NestJS's definition of ConfigService */
type KeyOf<T> = keyof T extends never ? string : keyof T;

export interface ConfigShape {
  readonly NODE_ENV: EnvName
}

@Injectable()
export class ConfigService<Config extends ConfigShape> extends NestConfigService<Config, true> {
  public readonly keys: SetLikeOfKeys<Config> = (() => {
    const config = this.getInternalConfigObject()
    const keys = toSetLikeOfKeys(config)

    return keys
  })()

  protected getInternalConfigObject(): Config {
    return this
      // @ts-expect-error: "`internalConfig` is private" (it should be `protected` really)
      .internalConfig
      ._PROCESS_ENV_VALIDATED
  }

  public override get<Key extends keyof Config>(key: Key): Config[Key] {
    return super.get(key as KeyOf<Config>)
  }

  public isDevelopment(): boolean {
    return this.get(this.keys.NODE_ENV) === EnvName.development
  }
}

// alias for convenience (there are a lot of `ConfigService` classes)
export { ConfigService as SharedConfigService }
