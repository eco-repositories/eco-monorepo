import { Module } from '@nestjs/common'
import { MicroservicesModule } from '#@/microservices/microservices.module.js'
import { DevController } from './dev.controller.js'
import { DevService } from './dev.service.js'

@Module({
  imports: [
    MicroservicesModule,
  ],
  providers: [
    DevService,
  ],
  controllers: [
    DevController,
  ],
})
export class DevModule {}
