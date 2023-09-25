import { Controller, Get, Post } from '@nestjs/common'
import { createLogger } from '@/common/create-logger.js'
import { type DataList, TestService, type Data } from './test.service.js'

@Controller('test')
export class TestController {
  protected readonly logger = createLogger(this.constructor.name)

  constructor(
    protected readonly testService: TestService,
  ) {}

  @Get('/')
  async getAllData(): Promise<Api.HttpResponseBody<DataList>> {
    const data = await this.testService.getAllData()

    return {
      result: data,
    }
  }

  @Post('/random')
  async createRandomData(): Promise<Api.HttpResponseBody<Data>> {
    const data = await this.testService.createRandomData()

    return {
      result: data,
    }
  }
}
