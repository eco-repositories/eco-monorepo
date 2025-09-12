import { Module } from "@nestjs/common"
import { ConfigModule } from "@@shared/microservice/config/config.module.js"
import { AppController } from "./app.controller.js"
import { AppService } from "./app.service.js"
import { ConfigDTO } from "./config.dto.js"

@Module({
  imports: [
    ConfigModule.forRoot(ConfigDTO, {
      isGlobal: true,
      envFileUrl: new URL('../../.env.local', import.meta.url),
    }),
  ],
  providers: [
    AppService,
  ],
  controllers: [
    AppController,
  ],
})
export class AppModule { }
