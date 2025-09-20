import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from "@nestjs/microservices"
import { createLogger } from '#shared/microservice/create-logger/create-logger.js'
import { ConfigService } from "#shared/microservice/config/config.service.js"
import { resolveConfig } from "#shared/microservice/config/resolve-config.js"
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
