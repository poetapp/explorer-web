import { useEffect, useState } from 'react'

export const useCounterLoop = () => {
  const [counter, setCounter] = useState(2)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCounter((counter + 1) % 3)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [counter])

  return counter
}