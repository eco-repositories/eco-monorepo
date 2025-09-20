import { Injectable } from '@nestjs/common'
import { ConfigService } from '#shared/microservice/config/config.service.js'
import { ConfigDTO } from './config.dto.js'

@Injectable()
export class AppService {
  private readonly port = this.config.get(this.config.keys.PORT)

  constructor(
    protected readonly config: ConfigService<ConfigDTO>,
  ) {}

  async getGreeting(): Promise<string> {
    return `Hello from the greeter on port ${this.port}!`
  }
}
