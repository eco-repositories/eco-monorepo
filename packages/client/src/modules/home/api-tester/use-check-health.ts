import { useCallback, useEffect, useState } from 'react'
import { type HealthCheck, checkHealth } from '@/api/check-health.ts'

/** @private */
const effectTriggerInitial = Symbol('effectTriggerInitial')

/** @private */
interface UseCheckHealthResult {
  readonly healthCheck: HealthCheck | undefined
  readonly healthCheckError: Error | undefined
  readonly fetchInProgress: boolean
  readonly triggerFetch: (this: unknown) => void
}

export function useCheckHealth(): UseCheckHealthResult {
  const [effectTrigger, setEffectTrigger] = useState<symbol>(effectTriggerInitial)
  const [fetchInProgress, setFetchInProgress] = useState(false)
  const [healthCheck, setHealthCheck] = useState<HealthCheck>()
  const [healthCheckError, setHealthCheckError] = useState<Error>()

  useEffect(() => {
    if (effectTrigger === effectTriggerInitial) {
      return
    }

    const abortController = new AbortController()

    setHealthCheck(undefined)
    setHealthCheckError(undefined)

    void (async () => {
      setFetchInProgress(true)

      try {
        const healthCheck = await checkHealth({
          signal: abortController.signal,
        })

        setHealthCheck(healthCheck)
      } catch (caught) {
        if (caught instanceof Error) {
          setHealthCheckError(caught)
        } else {
          setHealthCheckError(new UseCheckHealthUnknownError(caught))
        }
      } finally {
        setFetchInProgress(false)
      }
    })()

    return () => {
      abortController?.abort()
    }
  }, [
    effectTrigger,
    setHealthCheck,
    setHealthCheckError,
    setFetchInProgress,
  ])

  const triggerFetch = useCallback(() => {
    setEffectTrigger(Symbol('effectTrigger'))
  }, [setEffectTrigger])

  return {
    healthCheck,
    healthCheckError,
    fetchInProgress,
    triggerFetch,
  }
}

export class UseCheckHealthUnknownError extends Error {
  constructor(public readonly cause: unknown) {
    super('Unknown error occurred during health check')
  }
}
