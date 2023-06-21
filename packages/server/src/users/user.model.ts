import bcrypt from 'bcrypt'
import { Table, Column, DataType, Model } from 'sequelize-typescript'
import { randomUUID } from 'crypto'

/** @private */
interface CreatePasswordHashParams {
  readonly saltRounds?: number
}

/** @private */
const defaultSaltRounds = 10

export const displayNameMaxLength = 255

@Table({
  tableName: 'user',
})
export class User extends Model {
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
    const passwordsMatch = await bcrypt.compare(passwordGuessLiteral, this.passwordHash)

    return passwordsMatch
  }
}
