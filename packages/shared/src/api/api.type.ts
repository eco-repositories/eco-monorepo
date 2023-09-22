import { type HealthCheckResult } from './health-check-result/health-check-result.type.js'
import { type HttpErrorResponseBody } from './http-error-response-body/http-error-response-body.type.js'
import { type HttpResponseBody } from './http-response-body/http-response-body.type.js'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Api {
    export { type HealthCheckResult }
    export { type HttpResponseBody }
    export { type HttpErrorResponseBody }
  }
}
