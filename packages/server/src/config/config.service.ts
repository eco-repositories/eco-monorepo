import { Injectable } from '@nestjs/common'
import { SharedConfigService } from '#shared/microservices/config/config.service.js'
import { type ConfigDTO } from './config.dto.js'

@Injectable()
export class ConfigService extends SharedConfigService<ConfigDTO> {
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
