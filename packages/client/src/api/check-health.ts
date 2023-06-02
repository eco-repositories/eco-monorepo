import { type AxiosRequestConfig } from 'axios'
import { client } from './client.js'

/** @deprecated Refer to types on the server or from `@nestjs/terminus` */
export type HealthCheck<ServiceName extends string = string> = {
  readonly status: 'error' | 'ok' | 'shutting_down'
} & {
  readonly [K in 'info' | 'detail' | 'error']: Record<ServiceName, Record<string, unknown>>
}

export async function checkHealth(config?: AxiosRequestConfig): Promise<HealthCheck> {
  const { data } = await client.get<{ result: HealthCheck }>('/v1/health', config)

  return data.result
}
