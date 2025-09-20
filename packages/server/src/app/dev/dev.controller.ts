import { Controller, Get, Inject } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { greeter, Greeter, GREETER } from '#@/microservices/microservices.module.js'
import { DevService } from './dev.service.js'

@Controller('dev')
export class DevController {
  constructor(
    @Inject(GREETER)
    protected readonly greeter: Greeter,
    protected readonly devService: DevService,
  ) { }

  @Get()
  async getDev(): Promise<Api.HttpResponseBody<readonly string[]>> {
    const greetings = await Promise.all([
      this.devService.getGreeting(),
      firstValueFrom(
        this.greeter.send(greeter.greet, {}),
      ),
    ])

    return {
      result: greetings,
    }
  }
}
