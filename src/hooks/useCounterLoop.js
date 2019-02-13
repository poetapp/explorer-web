import { useEffect, useState } from 'react'

export const useCounterLoop = () => {
  const [counter, setCounter] = useState(2)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCounter((counter + 1) % 3)
    }, 250)
    return () => clearTimeout(timeout)
  }, [counter])

  return counter
}