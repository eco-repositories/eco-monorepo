import { Controller } from "@nestjs/common"
import { MessagePattern } from "@nestjs/microservices"
import { greeter } from '@/index.js'
import { AppService } from "./app.service.js"

@Controller()
export class AppController {
  constructor(
    protected readonly appService: AppService,
  ) { }

  @MessagePattern(greeter.greet)
  async greet(): Promise<string> {
    return this.appService.getGreeting()
  }
}
