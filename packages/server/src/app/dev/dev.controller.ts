import { Controller, Get } from '@nestjs/common'
import { DevService } from './dev.service.js'

@Controller('dev')
export class DevController {
  constructor(
    protected readonly devService: DevService,
  ) {}

  @Get()
  async getDev(): Promise<Api.HttpResponseBody<string[]>> {
    const greetings = await this.devService.getGreetings()

    return {
      result: greetings,
    }
  }
}
