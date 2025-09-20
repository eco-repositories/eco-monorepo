import { type ClassConstructor } from 'class-transformer'
import { validateAgainstModel } from '#@/validate-against-model/validate-against-model.js'

export function validateConfig<Config extends object>(Config: ClassConstructor<Config>, configPlain: object): Config {
  const result = validateAgainstModel(Config, configPlain, {
    validate: {
      stopAtFirstError: true,
      whitelist: true,
    },
  })

  if (!result.success) {
    throw result.payload
  }

  return result.payload
}
