import { Global, Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { Microservice } from '#shared/microservice/microservice.type.js'
import { Comms } from '#greeter'
import { ConfigModule } from '#@/config/config.module.js'
import { ConfigService } from '#@/config/config.service.js'

export { greeter } from '#greeter'

export const GREETER = Symbol('GREETER')

export type Greeter = Microservice<Comms>

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: GREETER,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get(config.keys.GREETER_HOST),
            port: +config.get(config.keys.GREETER_PORT),
          },
        }),
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class MicroservicesModule { }
