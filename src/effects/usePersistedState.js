import { useState, useEffect } from 'react'

export const usePersistedState = (key) => {
  const [state, setState] = useState(window.localStorage.getItem(key))

  useEffect(() => {
    if (state)
      window.localStorage.setItem(key, state)
    else
      window.localStorage.removeItem(key)
  }, [state])

  return [state, setState]
}