import { Module } from '@nestjs/common'
import { DbModule } from '@/db/db.module.js'
import { BalanceEvent } from './balance-event.model.js'
import { Category } from './category.model.js'
import { TestController } from './test.controller.js'
import { TestService } from './test.service.js'
import { User } from './user.model.js'

@Module({
  imports: [
    DbModule,
    DbModule.forFeature([BalanceEvent, Category, User]),
  ],
  providers: [
    TestService,
  ],
  controllers: [
    TestController,
  ],
})
export class TestModule {}
