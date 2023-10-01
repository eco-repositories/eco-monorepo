import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { createLogger } from '@/common/create-logger.js'
import { Transfer } from './transfer.model.js'
import { EntitiesService } from './entities.service.js'

@Injectable()
export class TransfersService {
  protected readonly logger = createLogger(this.constructor.name)

  constructor(
    protected readonly entitiesService: EntitiesService,

    @InjectRepository(Transfer)
    protected readonly transferRepo: Repository<Transfer>,
  ) {}

  async createTransfer(
    debitAmount: number,
    debitEntityId: string,
    creditEntityId: string,
  ): Promise<Transfer> {
    const now = new Date()

    const [
      debitEntity,
      debitEntityBalance,
      creditEntity,
      creditEntityBalance,
    ] = await Promise.all([
      this.entitiesService.getExistingEntityById(debitEntityId),
      this.entitiesService.getLatestBalanceByEntityId(debitEntityId),
      this.entitiesService.getExistingEntityById(creditEntityId),
      this.entitiesService.getLatestBalanceByEntityId(creditEntityId),
    ])

    const logger = this.logger.contextualize(this.createTransfer.name)

    logger.log(`Transferring ${debitAmount} from "${debitEntity.name}" (current balance: ${debitEntityBalance}) to "${creditEntity.name}" (current balance: ${creditEntityBalance}) …`)

    const transfer = this.transferRepo.create({
      timestamp: now,
      debitAmount,
      debitEntity,
      creditEntity,
    })

    await this.transferRepo.save(transfer)

    const debitEntityBalanceNew = debitEntityBalance - debitAmount
    const creditEntityBalanceNew = creditEntityBalance + debitAmount

    logger.log(`Setting new "${debitEntity.name}" balance to ${debitEntityBalanceNew} …`)
    logger.log(`Setting new "${creditEntity.name}" balance to ${creditEntityBalanceNew} …`)

    logger.log(JSON.stringify({
      debitAmount,
      debitEntityBalance,
      debitEntityBalanceNew,
      creditEntityBalance,
      creditEntityBalanceNew,
    }, null, 2))

    const [
      debitBalanceEvent,
      creditBalanceEvent,
    ] = await Promise.all([
      this.entitiesService.createBalanceEvent(transfer.id, debitEntity, debitEntityBalanceNew),
      this.entitiesService.createBalanceEvent(transfer.id, creditEntity, creditEntityBalanceNew),
    ])

    logger.log(`Transferred ${transfer.debitAmount} from "${transfer.debitEntity.name}" to "${transfer.creditEntity.name}"`)
    logger.log(`Balance of "${debitBalanceEvent.entity.name}" has changed from ${debitEntityBalance} to ${debitBalanceEvent.entityBalance}`)
    logger.log(`Balance of "${creditBalanceEvent.entity.name}" has changed from ${creditEntityBalance} to ${creditBalanceEvent.entityBalance}`)

    return transfer
  }

  async getTransfers(): Promise<Transfer[]> {
    const transfers = await this.transferRepo.find()

    return transfers
  }
}
