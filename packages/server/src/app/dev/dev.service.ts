import { Injectable } from '@nestjs/common'

@Injectable()
export class DevService {
  async getGreeting(): Promise<string> {
    return 'Hello from dev service!'
  }
}
