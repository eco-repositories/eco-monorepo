import { Injectable, type LogLevel as LoggerMethodName } from '@nestjs/common'
import { AbstractLogger, type LogLevel, type LogMessage, type LogMessageType } from 'typeorm'
import { createLogger } from '@/common/create-logger.js'

/** @private */
type LogType = LogMessageType | LogLevel

/** @private */
type LogArg = string | number | LogMessage

@Injectable()
export class DbLogger extends AbstractLogger {
  protected readonly logger = createLogger('DB')

  protected readonly logTypeToLoggerMethodNameMap = {
    error: 'error',
    info: 'log',
    log: 'log',
    migration: 'log',
    query: 'debug',
    'query-error': 'error',
    'query-slow': 'warn',
    schema: 'log',
    'schema-build': 'log',
    warn: 'warn',
  } satisfies Record<LogType, LoggerMethodName | null>

  constructor() {
    super('all')
  }

  protected override writeLog(logLevel: LogLevel, logArgs: LogArg | LogArg[]): void {
    const logs = this.prepareLogMessages(logArgs, {
      appendParameterAsComment: true,
    })

    for (const log of logs) {
      const logType: LogType = log.type ?? logLevel
      const loggerMethodName = this.logTypeToLoggerMethodNameMap[logType]

      if (loggerMethodName != null) {
        this.logger[loggerMethodName](log.message)
      }
    }
  }
}
