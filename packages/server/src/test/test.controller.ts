import { Controller, Get } from '@nestjs/common'
import { TestService } from './test.service.js'

@Controller('test')
export class TestController {
  constructor(
    protected readonly testService: TestService,
  ) {}

  @Get('/')
  async getTest(): Promise<unknown> {
    const test = await this.testService.getTest()

    return {
      result: test,
    }
  }
}
