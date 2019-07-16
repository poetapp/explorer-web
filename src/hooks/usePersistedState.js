import { useState, useEffect } from 'react'

/**
 * usePersistedState acts like React's useState, backing the value to and from LocalStorage.
 *
 * There's one caveat: every call to usePersistedState will allocate a new state entry in React, no matter the key.
 * This means two different calls to usePersistedState with the same key will NOT benefit from React's
 * re-renders when one updates.
 *
 * See the following example:
 *
 * ```
 *  // initial state: 'initial value' stored in localStorage.key1
 *
 *  const [value, setValue] = usePersistentStorage('key1')
 *  const [value2, setValue2] = usePersistentStorage('key1') // same key
 *
 *  assert(value === value2) // true
 *
 *  useEffect(() => {
 *    setValue('new value')
 *  }, [])
 *
 *  useEffect(() => {
 *    assert(value === value2) // true the first time when conditions are initial, false after setValue is called since value2 isn't updated by React
 *  }, [value])
 *
 *  useEffect(() => {
 *    assert(value === value2) // true, but will not run when setValue is called
 *  }, [value2])
 * ```
 *
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
