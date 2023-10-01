import { Column, Entity as Model, JoinColumn, ManyToOne, Relation } from 'typeorm'
import { Transfer } from './transfer.model.js'
import { Entity } from './entity.model.js'

@Model({
  name: 'balance_event',
})
export class BalanceEvent {
  @Column({
    name: 'transfer_id',
    type: 'uuid',
    primary: true,
    update: false,
  })
  readonly transferId!: string

  @Column({
    name: 'entity_id',
    type: 'uuid',
    primary: true,
    update: false,
  })
  readonly entityId!: string

  @Column({
    name: 'entity_balance',
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      from: parseFloat,
      to: String,
    },
  })
  readonly entityBalance!: number

  // ***

  @ManyToOne(() => Transfer, (transfer) => transfer.balanceEvents, {
    eager: true,
  })
  @JoinColumn({
    name: 'transfer_id',
  })
  readonly transfer!: Relation<Transfer>

  @ManyToOne(() => Entity, (entity) => entity.balanceEvents, {
    eager: true,
  })
  @JoinColumn({
    name: 'entity_id',
  })
  readonly entity!: Relation<Entity>
}
