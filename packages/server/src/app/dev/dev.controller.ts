import { Controller, Get } from '@nestjs/common'

@Controller('dev')
export class DevController {
  @Get()
  async getDev(): Promise<Api.HttpResponseBody<string>> {
    return {
      result: 'Hello from dev module!',
    }
  }
}
