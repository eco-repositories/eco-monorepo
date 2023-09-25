import { Column, Model, Table } from 'sequelize-typescript'

/** @private */
type CategoryType = 'expense' | 'income'

/** @private */
interface CategoryCreation {
  readonly name: string
  readonly type: CategoryType
}

@Table({})
export class Category extends Model<CategoryCreation> implements CategoryCreation {
  @Column({
    field: 'category_name',
  })
  readonly name!: string

  @Column({
    field: 'category_type',
  })
  readonly type!: CategoryType
}
