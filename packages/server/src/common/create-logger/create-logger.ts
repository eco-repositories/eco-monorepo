import { Logger } from '@nestjs/common'

export { type Logger } from '@nestjs/common'

/** @private */
type CreateLoggerParams = NonNullable<ConstructorParameters<typeof Logger>[1]>

export function createLogger(context: string, {
  timestamp = true,
}: CreateLoggerParams = {}): Logger {
  const logger = new Logger(context, { timestamp })

  return logger
}
