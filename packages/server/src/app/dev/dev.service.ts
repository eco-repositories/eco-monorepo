import { Inject, Injectable } from '@nestjs/common'
import { Greeter, GREETER, greeter } from '@/greeter/greeter.module.js'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class DevService {
  constructor(
    @Inject(GREETER) protected readonly greeter: Greeter,
  ) { }

  async getGreetings(): Promise<string[]> {
    const greeterResponse = await firstValueFrom(
      this.greeter.send(greeter.greet)
    )

    return [
      'Hello from dev module!',
      greeterResponse,
    ]
  }
}
