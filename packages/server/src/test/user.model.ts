import { Column, Model, Table } from 'sequelize-typescript'

/** @private */
interface UserType {
  readonly name: string
  readonly isActive: boolean
}

@Table({
  tableName: 'user',
})
export class User extends Model<UserType> implements UserType {
  @Column({
    field: 'user_name',
  })
  readonly name!: string

  @Column({
    field: 'user_is_active',
    defaultValue: true,
  })
  readonly isActive!: boolean
}
