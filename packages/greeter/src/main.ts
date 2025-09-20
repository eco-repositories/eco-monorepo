import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from "@nestjs/microservices"
import { createLogger } from '#shared/microservices/create-logger/create-logger.js'
import { ConfigService } from "#shared/microservices/config/config.service.js"
import { resolveConfig } from "#shared/microservices/config/resolve-config.js"
import { AppModule } from "./app/app.module.js"
import { ConfigDTO } from "./app/config.dto.js"

async function bootstrap(): Promise<void> {
  const logger = createLogger(bootstrap)

  const [config] = await resolveConfig<ConfigDTO>(AppModule, ConfigService)

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    logger,
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: +config.get(config.keys.PORT),
    },
  })

  await app.listen()
}

void bootstrap()
