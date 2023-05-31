import { type INestApplication, ValidationPipe, VersioningType } from '@nestjs/common'
import { HttpExceptionFilter } from './http-exception.filter.js'

export function decorateApp(app: INestApplication): void {
  app.enableCors()

  app.enableShutdownHooks()

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  })

  app.useGlobalFilters(
    app.get(HttpExceptionFilter),
  )

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )
}
