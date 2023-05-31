import { Catch, type ArgumentsHost } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
  // TODO: extend with custom logic
  catch(caught: unknown, host: ArgumentsHost): void {
    super.catch(caught, host)
  }
}
