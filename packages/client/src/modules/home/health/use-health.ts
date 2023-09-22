import { useState, useEffect, useCallback } from 'react'
import { getHealth, type Health } from '@/api/get-health/get-health.js'

/** @private */
type HealthRefresher = () => void

export function useHealth(): readonly [Health | null, HealthRefresher] {
  const [health = null, setHealth] = useState<Health>()
  const [effectID, setEffectID] = useState(0)

  const refreshHealth: HealthRefresher = useCallback(() => {
    setEffectID(effectID + Math.random())
  }, [effectID, setEffectID])

  useEffect(() => {
    let mounted = true

    void (async () => {
      const result = await getHealth()

      if (mounted) {
        setHealth(result)
      }
    })()

    return () => {
      mounted = false
    }
  }, [setHealth, effectID])

  return [health, refreshHealth]
}
