import { ConfigDTO } from './config.dto.js'
import { EnvName } from './env-name.js'
import { validateConfig } from './validate-config.js'

describe('validateConfig', () => {
  const validPlain: ConfigDTO = {
    NODE_ENV: EnvName.test,
    PORT: '1234',
    RATE_LIMITER_TIMEFRAME_MSEC: 1000,
    RATE_LIMITER_MAX_HITS_PER_TIMEFRAME: 10,
  }

  it(`should convert plain valid config objects to instances of ${ConfigDTO.name}`, () => {
    const config = validateConfig(validPlain)

    expect(config).toBeInstanceOf(ConfigDTO)
  })
})
