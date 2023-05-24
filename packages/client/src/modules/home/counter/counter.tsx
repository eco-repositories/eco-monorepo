import { useState } from 'react'

export const Counter: React.FC = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <p>Count: {count}</p>
      <div>
        <button
          type="button"
          onClick={() => {
            setCount((currentCount) => currentCount + 1)
          }}
        >
          Increment
        </button>
      </div>
    </>
  )
}
