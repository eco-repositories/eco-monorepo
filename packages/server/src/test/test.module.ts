import { Module } from '@nestjs/common'
import { DbModule } from '@/db/db.module.js'
import { EntitiesController } from './entities.controller.js'
import { EntitiesService } from './entities.service.js'
import { BalanceEvent } from './balance-event.model.js'
import { Entity } from './entity.model.js'
import { Transfer } from './transfer.model.js'
import { TransfersService } from './transfers.service.js'
import { TransfersController } from './transfer.controller.js'

@Module({
  imports: [
    DbModule,
    DbModule.forFeature([BalanceEvent, Entity, Transfer]),
  ],
  providers: [
    EntitiesService,
    TransfersService,
  ],
  controllers: [
    EntitiesController,
    TransfersController,
  ],
})
export class TestModule {}
