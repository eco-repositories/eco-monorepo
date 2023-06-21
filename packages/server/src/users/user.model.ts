import bcrypt from 'bcrypt'
import { Table, Column, DataType, Model } from 'sequelize-typescript'
import { type ModelScopeOptions } from 'sequelize'
import { randomUUID } from 'crypto'
import { ServerError } from '@/app/app-error/app-error.js'
import { toSetLikeOfKeys } from '@@shared/to-set-like-of-keys/to-set-like-of-keys.js'

/** @private */
interface CreatePasswordHashParams {
  readonly saltRounds?: number
}

/** @private */
const defaultSaltRounds = 10

export const displayNameMaxLength = 255

/** @private */
const scopes = {
  withoutPassword: {
    attributes: {
      exclude: ['passwordHash'],
    },
  },
  withAllAttributes: {
    include: {
      all: true,
    },
  },
} satisfies ModelScopeOptions<Model<User>>

@Table({
  tableName: 'user',
  scopes,
  defaultScope: scopes.withoutPassword,
  timestamps: false,
})
export class User extends Model {
  static readonly scopeNames = toSetLikeOfKeys(scopes)

  static async createPasswordHash(passwordLiteral: string, {
    saltRounds = defaultSaltRounds,
  }: CreatePasswordHashParams = {}): Promise<string> {
    const hash = await bcrypt.hash(passwordLiteral, saltRounds)

    return hash
  }

  @Column({
    primaryKey: true,
    field: 'user_id',
    type: DataType.UUID,
    defaultValue: randomUUID,
  })
  override readonly id!: string

  @Column({
    field: 'user_username',
    type: DataType.STRING,
    unique: 'user__user_username__unique',
    allowNull: false,
    onUpdate: 'RESTRICT',
  })
  readonly username!: string

  @Column({
    field: 'user_display_name',
    type: DataType.STRING(displayNameMaxLength),
  })
  displayName!: string

  @Column({
    field: 'user_password_hash',
    type: DataType.STRING,
    allowNull: false,
  })
  readonly passwordHash!: string

  async isPasswordGuessCorrect(passwordGuessLiteral: string): Promise<boolean> {
    if (this.passwordHash == null) {
      throw new PasswordHashNotIncludedError(this.id)
    }

    const passwordsMatch = await bcrypt.compare(passwordGuessLiteral, this.passwordHash)

    return passwordsMatch
  }
}

export class PasswordHashNotIncludedError extends ServerError {
  override readonly statusCode = '500'

  constructor(public readonly userId: string) {
    super(`Property 'passwordHash' has been excluded. Please, fetch the user (id='${userId}') again using scope '${User.scopeNames.withAllAttributes}'`)
  }
}
