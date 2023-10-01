import { Column, Entity as Model, OneToMany, PrimaryGeneratedColumn, type Relation } from 'typeorm'
import { BalanceEvent } from './balance-event.model.js'

@Model({
  name: 'entity',
})
export class Entity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'entity_id',
  })
  readonly id!: string

  @Column({
    name: 'entity_name',
    type: 'varchar',
    length: 255,
    unique: true,
  })
  readonly name!: string

  @Column({
    name: 'entity_type',
    type: 'varchar',
    length: 255,
    unique: true,
  })
  readonly type!: string

  // ***

  @OneToMany(() => BalanceEvent, (balanceEvent) => balanceEvent.entity, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  readonly balanceEvents!: Array<Relation<BalanceEvent>>
}
