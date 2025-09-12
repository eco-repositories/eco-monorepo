import { DynamicModule, Global, Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule, ConfigModuleOptions } from '@nestjs/config'
import { ClassConstructor } from 'class-transformer'
import { fileURLToPath } from 'url'
import { ConfigService, ConfigShape } from './config.service.js'
import { validateConfig } from './validate-config.js'

export interface ConfigModuleParams extends Omit<ConfigModuleOptions, 'envFilePath' | 'validate'> {
  readonly envFileUrl: URL // adopt to ESM
}

@Global()
@Module({})
export class ConfigModule {
  static forRoot<Config extends ConfigShape>(Config: ClassConstructor<Config>, options: ConfigModuleParams): DynamicModule {
    return {
      module: ConfigModule,
      imports: [
        NestConfigModule.forRoot({
          ...options,
          envFilePath: fileURLToPath(options.envFileUrl),
          validate: validateConfig.bind(null, Config),
        }),
      ],
      providers: [
        ConfigService,
      ],
      exports: [
        ConfigService,
      ],
    }
  }
}
