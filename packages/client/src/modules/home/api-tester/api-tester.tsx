import { useEffect, useState } from 'react'
import { type Test, getTest } from '@/api/get-test.ts'
import { Loader } from '@/modules/common/loader/loader.tsx'

export const ApiTester: React.FC = () => {
  const [trigger, setTrigger] = useState(Math.random)
  const [inProgress, setInProgress] = useState(false)
  const [test, setTest] = useState<Test>()

  useEffect(() => {
    const abortController = new AbortController()

    void (async () => {
      setTest(undefined)
      setInProgress(true)

      const test = await getTest({
        signal: abortController.signal,
      })

      setTest(test)
      setInProgress(false)
    })()

    return () => {
      abortController.abort()
    }
  }, [trigger])

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setTrigger(Math.random)
        }}
      >
        Test API
      </button>
      <p>
        {inProgress ? <Loader/> : test == null ? '' : <code>{JSON.stringify(test, null, 2)}</code>}
      </p>
    </>
  )
}
