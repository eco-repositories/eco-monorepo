import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersService } from './users.service.js'
import { UsersController } from './users.controller.js'
import { User } from './user.model.js'

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
  ],
  providers: [
    UsersService,
  ],
  controllers: [
    UsersController,
  ],
})
export class UsersModule {}
