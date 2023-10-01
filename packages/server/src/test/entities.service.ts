import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ClientError } from '@/app/app-error/app-error.js'
import { Repository } from 'typeorm'
import { Entity } from './entity.model.js'
import { BalanceEvent } from './balance-event.model.js'

@Injectable()
export class EntitiesService {
  constructor(
    @InjectRepository(Entity)
    protected readonly entityRepo: Repository<Entity>,

    @InjectRepository(BalanceEvent)
    protected readonly balanceEventRepo: Repository<BalanceEvent>,
  ) {}

  async createEntity(name: string): Promise<Entity> {
    const existing = await this.entityRepo.findOneBy({ name })

    if (existing != null) {
      throw new EntityNameAlreadyTakenError(existing.name)
    }

    const entity = this.entityRepo.create({ name })

    await this.entityRepo.save(entity)

    return entity
  }

  async getEntities(): Promise<Entity[]> {
    const entities = await this.entityRepo.find()

    return entities
  }

  async getExistingEntityById(id: string): Promise<Entity> {
    const entity = await this.entityRepo.findOneBy({ id })

    if (entity == null) {
      throw new EntityNotFoundByIdError(id)
    }

    return entity
  }

  async getBalanceEventsByEntityId(entityId: string, limit = 10): Promise<BalanceEvent[]> {
    const balanceEvents = await this.balanceEventRepo.find({
      where: {
        entityId,
      },
      order: {
        transfer: {
          timestamp: 'DESC',
        },
      },
      take: limit,
    })

    return balanceEvents
  }

  async getLatestBalanceByEntityId(id: string): Promise<number> {
    // throw 404 if entity does not exist
    await this.getExistingEntityById(id)

    const balanceEvents = await this.getBalanceEventsByEntityId(id, 1)
    const entityBalance = balanceEvents[0]?.entityBalance ?? 0

    return entityBalance
  }

  async createBalanceEvent(transferId: string, entityOrEntityId: Entity | string, entityBalance: number): Promise<BalanceEvent> {
    const entity = entityOrEntityId instanceof Object ? entityOrEntityId : await this.getExistingEntityById(entityOrEntityId)
    const balanceEventRaw = this.balanceEventRepo.create({
      transferId,
      entity,
      entityBalance,
    })

    const balanceEvent = await this.balanceEventRepo.save(balanceEventRaw)

    return balanceEvent
  }
}

export class EntityNameAlreadyTakenError extends ClientError {
  public readonly statusCode = '409'

  constructor(
    public readonly entityName: string,
  ) {
    super(`Entity with the name "${entityName}" already exists in the database`)
  }
}

export class EntityNotFoundByIdError extends ClientError {
  public readonly statusCode = '404'

  constructor(
    public readonly entityId: string,
  ) {
    super(`Entity with the ID "${entityId}" was not found`)
  }
}
