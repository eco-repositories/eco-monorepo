import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module.js'
import { createLogger } from './common/create-logger/create-logger.js'
import { configureApp } from './configure-app.js'
import { ConfigService } from './config/config.service.js'

async function bootstrap(): Promise<void> {
  const logger = createLogger(bootstrap.name)

  const app = await NestFactory.create(AppModule, { logger })

  configureApp(app)

  const config = app.get(ConfigService)
  const port = config.get(config.keys.PORT)

  await app.listen(port, async () => {
    const url = await app.getUrl()

    logger.log(`Server is running on ${url}`)
  })
}

void bootstrap()
