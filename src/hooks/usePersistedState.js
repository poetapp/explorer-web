import { useState, useEffect } from 'react'

/**
 * usePersistedState acts like React's useState, backing the value to and from LocalStorage.
 * There's one caveat: every call to usePersistedState will allocate a new state entry, no matter the key.
 * This means two different calls to usePersistedState with the same key will NOT benefit from React's
 * re-renders when one updates.
 * In practice this means this function should only be called once per key in the entire application.
 * The best place to do so will usually be a Context Provider.
 */
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
