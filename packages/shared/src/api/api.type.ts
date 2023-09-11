import { type HealthCheckResult } from './health-check-result/health-check-result.type.js'
import { type HttpResponse } from './http-response/http-response.type.js'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Api {
    export { type HealthCheckResult }
    export { type HttpResponse }
  }
}
