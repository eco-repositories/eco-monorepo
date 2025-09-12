import { NestFactory } from "@nestjs/core"
import { MicroserviceOptions, Transport } from "@nestjs/microservices"
import { ConfigModule } from "@@shared/microservice/config/config.module.js"
import { ConfigService } from "@@shared/microservice/config/config.service.js"
import { resolveConfig } from "@@shared/microservice/config/resolve-config.js"
import { AppModule } from "./app/app.module.js"
import { ConfigDTO } from "./app/config.dto.js"

async function bootstrap(): Promise<void> {
  const [config] = await resolveConfig<ConfigDTO>(ConfigModule, ConfigService)

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: +config.get(config.keys.PORT),
    },
  })

  await app.listen()
}

void bootstrap()
