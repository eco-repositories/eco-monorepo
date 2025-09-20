import * as NestJs from '@nestjs/common'
import { sha1 as hash } from 'object-hash'

interface Named {
  readonly name: string
}

type ContextInput = string | Named

export function getContext(input: ContextInput): string {
  return input instanceof Object ? input.name : input
}

/** @private */
type LoggerParams = NestJs.ConsoleLoggerOptions

/** @private */
const defaultLoggerParams = {
  timestamp: true,
} satisfies LoggerParams

/** @public */
class Logger extends NestJs.ConsoleLogger {
  protected readonly contextLevelSeparator: string = '/'
  protected override readonly context: string // make context required

  constructor(
    contextInput: ContextInput,
    protected readonly params: LoggerParams = defaultLoggerParams,
  ) {
    super(params)

    this.context = getContext(contextInput)
  }

  contextualize(childContextInput: ContextInput): Logger {
    const childContext = getContext(childContextInput)
    const newContext = `${this.context}${this.contextLevelSeparator}${childContext}`
    const childLogger = loggerFactory.createOrGet(newContext, this.params)

    return childLogger
  }
}

export { type Logger } // disallow using constructor directly

/** @private */
class LoggerFactory {
  protected readonly instanceCache = Object.create(null) as Record<string, Logger>
  private readonly defaultLoggerParamsHash = hash(defaultLoggerParams)
  private readonly nullHash = hash(null)

  private createParamsHash(params: LoggerParams | undefined): string {
    if (params == null) {
      return this.nullHash
    }

    if (params === defaultLoggerParams) {
      return this.defaultLoggerParamsHash
    }

    return hash(params)
  }

  protected createArgsHash(context: string, params: LoggerParams | undefined): string {
    const paramsHash = this.createParamsHash(params)
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

export function createLogger(contextInput: ContextInput, params: LoggerParams = defaultLoggerParams): Logger {
  const context = getContext(contextInput)
  const logger = loggerFactory.createOrGet(context, params)

  return logger
}
