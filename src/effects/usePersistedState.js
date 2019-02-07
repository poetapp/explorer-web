import { useState, useEffect } from 'react'

export const usePersistedState = (key) => {
  const [state, setState] = useState(JSON.parse(window.localStorage.getItem(key)))

  useEffect(() => {
    if (state)
      window.localStorage.setItem(key, JSON.stringify(state))
    else
      window.localStorage.removeItem(key)
  }, [state])

  return [state, setState]
}