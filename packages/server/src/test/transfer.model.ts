import { Column, Entity as Model, ManyToOne, JoinColumn, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm'
import { BalanceEvent } from './balance-event.model.js'
import { Entity } from './entity.model.js'

@Model({
  name: 'transfer',
})
export class Transfer {
  @PrimaryGeneratedColumn('uuid', {
    name: 'transfer_id',
  })
  readonly id!: string

  @Column({
    name: 'transfer_timestamp',
    type: 'timestamp with time zone',
    update: false,
  })
  readonly timestamp!: Date

  @Column({
    name: 'transfer_debit_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  readonly debitAmount!: number

  @ManyToOne(() => Entity, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({
    name: 'transfer_debit_entity_id',
  })
  readonly debitEntity!: Relation<Entity>

  @ManyToOne(() => Entity, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({
    name: 'transfer_credit_entity_id',
  })
  readonly creditEntity!: Relation<Entity>

  @ManyToOne(() => Transfer, {
    eager: false,
    nullable: true,
  })
  @JoinColumn({
    name: 'transfer_refunded_transfer_id',
  })
  readonly refundedTransfer?: Relation<Transfer> | null

  @Column({
    name: 'transfer_description',
    type: 'varchar',
    length: 255,
    nullable: true,
    transformer: {
      from: parseFloat,
      to: String,
    },
  })
  readonly description?: string | null

  // ***

  @OneToMany(() => BalanceEvent, (event) => event.transfer, {
    nullable: false,
  })
  readonly balanceEvents!: Array<Relation<BalanceEvent>>
}
