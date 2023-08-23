import { validateAgainstModel } from '@/common/validate-against-model.js'
import { ConfigDTO } from './config.dto.js'

export function validateConfig(configPlain: object): ConfigDTO {
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
