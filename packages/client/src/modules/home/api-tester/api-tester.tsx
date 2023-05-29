import { Loader } from '@/modules/common/loader/loader.tsx'
import { useCheckHealth } from './use-check-health.ts'

export const ApiTester: React.FC = () => {
  const { healthCheck, healthCheckError, fetchInProgress, triggerFetch } = useCheckHealth()

  return (
    <>
      <button type="button" onClick={triggerFetch}>
        Test API
      </button>
      <section>
        {
          fetchInProgress
            ? <Loader/>
            : healthCheck != null
              ? <code><pre>{JSON.stringify(healthCheck, null, 2)}</pre></code>
              : healthCheckError != null
                ? healthCheckError.message
                : <>&hellip;</>
        }
      </section>
    </>
  )
}
