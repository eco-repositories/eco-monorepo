import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { ValidationError } from 'sequelize'
import { ClientError } from '@/app/app-error/app-error.js'
import { type CreateUserReqBody } from './create-user-req-body.dto.js'
import { User } from './user.model.js'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    protected readonly userModel: typeof User,
  ) {}

  private hasDuplicateUsernameErrorItem(caught: unknown): caught is ValidationError {
    if (!(caught instanceof ValidationError)) {
      return false
    }

    const hasDuplicateUsernameErrorItem = caught.errors.some((error) => (
      error.type === 'unique violation' && error.path === 'user_username'
    ))

    return hasDuplicateUsernameErrorItem
  }

  async createUser({ username, displayName, password }: CreateUserReqBody): Promise<User> {
    const passwordHash = await this.userModel.createPasswordHash(password)
    const user = this.userModel.build({
      username,
      displayName,
      passwordHash,
    })

    try {
      await user.save()
    } catch (caught) {
      if (this.hasDuplicateUsernameErrorItem(caught)) {
        throw new UsernameTakenError(username)
      }

      throw caught
    }

    return user
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.findAll()

    return users
  }

  async getExistingUserById(id: string): Promise<User> {
    const user = await this.userModel.findByPk(id)

    if (user == null) {
      throw new UserNotFoundByIdError(id)
    }

    return user
  }
}

export class UserNotFoundByIdError extends ClientError {
  override readonly statusCode = '404'

  constructor(
    public readonly userId: string,
  ) {
    super(`User '${userId}' is not found`)
  }
}

export class UsernameTakenError extends ClientError {
  override readonly statusCode = '409'

  constructor(
    public readonly username: string,
  ) {
    super(`User '${username}' already exists`)
  }
}
