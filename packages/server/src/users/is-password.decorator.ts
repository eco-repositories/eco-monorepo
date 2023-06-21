import { applyDecorators } from '@nestjs/common'
import { MinLength, Matches, IsString } from 'class-validator'

export const IsPassword = (): PropertyDecorator => applyDecorators(
  IsString(),
  MinLength(8),
  Matches(/[A-Z]/, {
    message: '$property must contain at least one capital letter',
  }),
  Matches(/[a-z]/, {
    message: '$property must contain at least one lowercase letter',
  }),
  Matches(/\d/, {
    message: '$property must contain at least one digit',
  }),
)
