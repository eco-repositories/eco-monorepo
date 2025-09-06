import { Global, Module } from "@nestjs/common"
import { ClientsModule, Transport } from "@nestjs/microservices"
import { Microservice } from '@@shared/microservice/microservice.type.js'
import { ConfigService } from "@/config/config.service.js"
import { Comms } from '@@greeter/index.js'

export { greeter } from '@@greeter/index.js'

export const GREETER = Symbol('Greeter')

export type Greeter = Microservice<Comms>

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: GREETER,
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
})
export class GreeterModule { }
