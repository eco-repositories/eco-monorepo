import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { Type } from 'class-transformer'
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator'
import { EntitiesService } from './entities.service.js'
import { type BalanceEvent } from './balance-event.model.js'
import { type Entity } from './entity.model.js'

/** @private */
class CreateEntityReqBodyDTO {
  @IsString()
  @IsNotEmpty()
  readonly name!: string
}

/** @private */
class GetEntityByIdParamsDTO {
  @IsUUID('4')
  @IsNotEmpty()
  readonly entity_id!: string
}

/** @private */
class GetEntityBalanceHistoryQueryDTO {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @Min(0)
  readonly max_entries?: number
}

@Controller('entities')
export class EntitiesController {
  constructor(
    protected readonly entitiesService: EntitiesService,
  ) {}

  @Get('/')
  async getEntities(): Promise<Api.HttpResponseBody<Entity[]>> {
    const entities = await this.entitiesService.getEntities()

    return {
      result: entities,
    }
  }

  @Get('/:entity_id')
  async getEntity(
    @Param() params: GetEntityByIdParamsDTO,
  ): Promise<Api.HttpResponseBody<Entity>> {
    const entity = await this.entitiesService.getExistingEntityById(params.entity_id)

    return {
      result: entity,
    }
  }

  @Get('/:entity_id/balance')
  async getEntityBalance(
    @Param() params: GetEntityByIdParamsDTO,
  ): Promise<Api.HttpResponseBody<number>> {
    const balance = await this.entitiesService.getLatestBalanceByEntityId(params.entity_id)

    return {
      result: balance,
    }
  }

  @Get('/:entity_id/balance-history')
  async getEntityBalanceHistory(
    @Param() params: GetEntityByIdParamsDTO,
    @Query() query: GetEntityBalanceHistoryQueryDTO,
  ): Promise<Api.HttpResponseBody<BalanceEvent[]>> {
    const history = await this.entitiesService.getBalanceEventsByEntityId(params.entity_id, query.max_entries)

    return {
      result: history,
    }
  }

  @Post('/')
  async createEntity(
    @Body() body: CreateEntityReqBodyDTO,
  ): Promise<Api.HttpResponseBody<Entity>> {
    const entity = await this.entitiesService.createEntity(body.name)

    return {
      result: entity,
    }
  }
}
