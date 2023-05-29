import { Module } from '@nestjs/common'
import { TestController } from './test.controller.js'
import { TestService } from './test.service.js'

@Module({
  providers: [
    TestService,
  ],
  controllers: [
    TestController,
  ],
})
export class TestModule {}
