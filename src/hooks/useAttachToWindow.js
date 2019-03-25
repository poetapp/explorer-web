import { useEffect } from 'react'

export const useAttatchToWindow = (thing, keyName) => useEffect(() => {
  window[keyName] = thing
  return () => delete window[keyName]
}, [thing])
