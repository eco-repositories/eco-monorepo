import { ConsoleLogger } from '@nestjs/common'
import { createLogger } from './create-logger.js'

describe(createLogger, () => {
  it('should create an instance of a Logger', () => {
    const logger = createLogger('some context')

    expect(logger).toBeInstanceOf(ConsoleLogger)
  })

  it('should deduplicate logger instances with the same context', () => {
    const logger1 = createLogger('my context')
    const logger2 = createLogger('my context')

    expect(logger1 === logger2).toBe(true)
  })
})
