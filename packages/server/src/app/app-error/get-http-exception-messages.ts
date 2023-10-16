import { type HttpException } from '@nestjs/common'

/** @private */
interface NestJsHttpExceptionResponseBodyExcerpt {
  readonly message: string | string[]
}

export function getHttpExceptionMessages(exception: HttpException): string[] {
  const response = exception.getResponse() as NestJsHttpExceptionResponseBodyExcerpt
  const messages = ([] as string[]).concat(response.message)

  return messages
}
