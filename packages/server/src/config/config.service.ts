import { Injectable } from '@nestjs/common'
import { ConfigService as NestConfigService } from '@nestjs/config'
import { type SetLikeOfKeys, toSetLikeOfKeys } from '@libs--eco/utils/to-set-like-of-keys/to-set-like-of-keys.js'
import { type ConfigDTO } from './config.dto.js'
import { EnvName } from './env-name.js'

/** @private */
type ConfigKey = keyof ConfigDTO

@Injectable()
export class ConfigService extends NestConfigService<ConfigDTO, true> {
  public readonly keys: SetLikeOfKeys<ConfigDTO> = (() => {
    const config = this.getInternalConfigObject()
    const keys = toSetLikeOfKeys(config)

    return keys
  })()

  protected getInternalConfigObject(): ConfigDTO {
    return this
      // @ts-expect-error: "`internalConfig` is private" (it should be `protected` really)
      .internalConfig
      ._PROCESS_ENV_VALIDATED
  }

  public override get<Key extends ConfigKey>(key: Key): ConfigDTO[Key] {
    return super.get(key)
  }

  public isDevelopment(): boolean {
    return this.get(this.keys.NODE_ENV) === EnvName.development
  }
  getCacheUrl(): string {
    const protocol = this.get(this.keys.CACHE_PROTOCOL)
    const hostname = this.get(this.keys.CACHE_HOST)
    const username = this.get(this.keys.CACHE_USER)
    const password = this.get(this.keys.CACHE_PASS)
    const port = this.get(this.keys.CACHE_PORT)

    const url = new URL(`${protocol}://${username}:${password}@${hostname}:${port}`)

    return url.toString()
  }
}
