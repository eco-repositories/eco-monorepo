import { IsInt, IsNotEmpty, IsString } from 'class-validator'
import { IsValidEnum } from '#@/is-valid-enum/is-valid-enum.decorator.js'
import { EnvName } from './env-name.js'
import { validateConfig } from './validate-config.js'

describe(validateConfig, () => {
  class ConfigDTO {
    @IsValidEnum(EnvName)
    readonly NODE_ENV!: EnvName

    @IsString()
    @IsNotEmpty()
    readonly FOO!: string

    @IsInt()
    readonly BAR!: number
  }

  it(`should convert plain valid config objects to instances of ${ConfigDTO.name}`, () => {
    const config = validateConfig(ConfigDTO, {
      NODE_ENV: EnvName.test,
      FOO: 'foo',
      BAR: 42,
    })

    expect(config).toBeInstanceOf(ConfigDTO)
  })
})
