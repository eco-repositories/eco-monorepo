import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreateUserReqBody } from './create-user-req-body.dto.js'
import { GetUserByIdReqParams } from './get-user-by-id-req-params.dto.js'
import { type User } from './user.model.js'
import { UsersService } from './users.service.js'

@Controller('users')
export class UsersController {
  constructor(
    protected readonly usersService: UsersService,
  ) {}

  @Post()
  async createUser(
    @Body()
    body: CreateUserReqBody,
  ): Promise<ServerApp.HttpResponse<User>> {
    const { username, displayName, password } = body

    const user = await this.usersService.createUser({ username, displayName, password })

    return {
      result: user,
    }
  }

  @Get()
  async getUsers(): Promise<ServerApp.HttpResponse<User[]>> {
    const users = await this.usersService.getUsers()

    return {
      result: users,
    }
  }

  @Get(':id')
  async getUserById(
    @Param()
    params: GetUserByIdReqParams,
  ): Promise<ServerApp.HttpResponse<User>> {
    const user = await this.usersService.getExistingUserById(params.id)

    return {
      result: user,
    }
  }
}
