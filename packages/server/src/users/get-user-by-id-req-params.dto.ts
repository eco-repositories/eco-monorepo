import { IsNotEmpty, IsUUID } from 'class-validator'

export class GetUserByIdReqParams {
  @IsUUID('4')
  @IsNotEmpty()
  readonly id!: string
}
