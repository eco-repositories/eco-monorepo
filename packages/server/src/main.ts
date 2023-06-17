import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module.js'
import { decorateApp } from './app/decorate-app.js'
import { createLogger } from './common/create-logger.js'
import { ConfigService } from './config/config.service.js'

async function bootstrap(): Promise<void> {
  const logger = createLogger(bootstrap.name)
  const app = await NestFactory.create(AppModule, { logger })

  decorateApp(app)

  const config = app.get(ConfigService)
  const port = config.get(config.keys.PORT)
  const mode = config.get(config.keys.NODE_ENV)

  await app.listen(port, async () => {
    const url = await app.getUrl()

    logger.log(`Server is running (mode: ${mode}) on ${url}`)
  })
}

void bootstrap()
