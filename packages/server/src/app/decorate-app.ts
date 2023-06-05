import { type INestApplication, ValidationPipe, VersioningType } from '@nestjs/common'
import { AppErrorFilter } from './app-error/app-error.filter.js'

export function decorateApp(app: INestApplication): void {
  app.enableCors()

  app.enableShutdownHooks()

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  })

  app.useGlobalFilters(
    app.get(AppErrorFilter),
  )

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )
}
