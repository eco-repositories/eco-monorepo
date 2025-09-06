import { NestFactory } from "@nestjs/core"
import { ClassConstructor } from "class-transformer"
import { ConfigService, ConfigShape } from "./config.service.js"

type ContextClosed = Promise<void>

export async function resolveConfig<
  Config extends ConfigShape,
>(
  Module: ClassConstructor<object>,
  Service: ClassConstructor<ConfigService<Config>>,
): Promise<readonly [ConfigService<Config>, ContextClosed]> {
  const context = await NestFactory.createApplicationContext(Module)
  const service = context.get(Service)
  const contextClosed = context.close() // the caller must opt-in to await this if they want

  return [service, contextClosed]
}
