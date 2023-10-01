import { Body, Controller, Get, Post } from '@nestjs/common'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator'
import { TransfersService } from './transfers.service.js'
import { type Transfer } from './transfer.model.js'

/** @private */
class CreateTransferReqBodyDTO {
  @IsUUID('4')
  @IsNotEmpty()
  readonly from!: string

  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsNotEmpty()
  readonly amount!: number

  @IsUUID('4')
  @IsNotEmpty()
  readonly to!: string
}

@Controller('transfers')
export class TransfersController {
  constructor(
    protected readonly transfersService: TransfersService,
  ) {}

  @Get('/')
  async getTransfers(): Promise<Api.HttpResponseBody<Transfer[]>> {
    const transfers = await this.transfersService.getTransfers()

    return {
      result: transfers,
    }
  }

  @Post('/')
  async createTransfer(
    @Body() body: CreateTransferReqBodyDTO,
  ): Promise<Api.HttpResponseBody<Transfer>> {
    const { amount: debitAmount, from: debitEntityId, to: creditEntityId } = body

    const transfer = await this.transfersService.createTransfer(debitAmount, debitEntityId, creditEntityId)

    return {
      result: transfer,
    }
  }
}
