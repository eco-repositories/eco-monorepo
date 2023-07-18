import * as NestJs from '@nestjs/common'
import { sha1 as hash } from 'object-hash'

/** @private */
type LoggerParams = NonNullable<ConstructorParameters<typeof NestJs.Logger>[1]>

/** @private */
const defaultLoggerParams = {
  timestamp: true,
} satisfies LoggerParams

/** @public */
class Logger extends NestJs.ConsoleLogger {
  protected readonly contextLevelSeparator: string = '/'

  constructor(
    protected override readonly context: string, // make context required
    protected readonly params: LoggerParams = defaultLoggerParams,
  ) {
    super(context, params)
  }

  contextualize(childContext: string): Logger {
    const newContext = `${this.context}${this.contextLevelSeparator}${childContext}`
    const childLogger = loggerFactory.createOrGet(newContext, this.params)

    return childLogger
  }
}

export { type Logger } // disallow using constructor directly

/** @private */
class LoggerFactory {
  protected readonly instanceCache = Object.create(null) as Record<string, Logger>

  protected createArgsHash(context: string, params: LoggerParams | undefined): string {
    const paramsHash = hash(params ?? null)
    const argsHash = `${context}${paramsHash}`

    return argsHash
  }

  createOrGet(context: string, params?: LoggerParams): Logger {
    const argsHash = this.createArgsHash(context, params)
    const logger = this.instanceCache[argsHash] ??= new Logger(context, params)

    return logger
  }
}

/** @private */
const loggerFactory = new LoggerFactory()

export function createLogger(context: string, params: LoggerParams = defaultLoggerParams): Logger {
  const logger = loggerFactory.createOrGet(context, params)

  return logger
}
