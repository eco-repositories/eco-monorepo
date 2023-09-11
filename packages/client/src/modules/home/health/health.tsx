import { useMemo } from 'react'
import { useHealth } from './use-health.js'

/** @private */
interface Props {
  readonly indentation?: string | number | null
}

/** @private */
const DEFAULT_INDENTATION = 2

export const Health: React.FC<Props> = ({
  indentation = DEFAULT_INDENTATION,
}) => {
  const [health] = useHealth()

  const ok = health?.status === 'ok'

  const healthJson = useMemo(() => {
    return JSON.stringify(health, null, indentation ?? undefined)
  }, [health, indentation])

  return (
    <pre style={{ color: ok ? 'initial' : 'red' }}>
      {healthJson}
    </pre>
  )
}
