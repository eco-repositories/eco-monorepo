import { Injectable } from '@nestjs/common'

/** @private */
interface Test {
  readonly message: string
}

@Injectable()
export class TestService {
  async getTest(): Promise<Test> {
    return {
      message: 'Test successful!',
    }
  }
}
