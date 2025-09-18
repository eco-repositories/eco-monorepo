import { type ClassConstructor } from 'class-transformer'
import { validateAgainstModel } from '#@/validate-against-model/validate-against-model.js'

export function validateConfig<ConfigDTO extends object>(ConfigDTO: ClassConstructor<ConfigDTO>, configPlain: object): ConfigDTO {
  const result = validateAgainstModel(ConfigDTO, configPlain, {
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
