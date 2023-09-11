import { client } from '@/api/client.js'
import { isAxiosError } from 'axios'

export type Health = Api.HealthCheckResult

export async function getHealth(): Promise<Health> {
  let health!: Health

  try {
    const response = await client.get<Api.HttpResponse<Health>>('/v1/health')

    health = response.data.result
  } catch (error) {
    if (!isAxiosError<Health>(error)) {
      throw error
    }

    if (error.response == null) {
      throw error
    }

    health = error.response.data
  }

  return health
}
