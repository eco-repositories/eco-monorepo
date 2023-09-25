import { Column, DataType, Model, Table } from 'sequelize-typescript'

/** @private */
interface BalanceEventType {
  readonly timestamp: number
  readonly entityBalance: number
}

@Table({})
export class BalanceEvent extends Model<BalanceEventType> implements BalanceEventType {
  @Column({
    type: DataType.BIGINT,
    field: 'balance_event_timestamp',
    defaultValue: Date.now,
  })
  readonly timestamp!: number

  @Column({
    field: 'entity_balance',
  })
  readonly entityBalance!: number
}
