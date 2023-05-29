import { type AxiosRequestConfig } from 'axios'
import { client } from './client.ts'

export interface Test {
  readonly result: {
    readonly message: string
  }
}

export async function getTest(config?: AxiosRequestConfig): Promise<Test> {
  const { data: test } = await client.get<Test>('/v1/test', config)

  return test
}
