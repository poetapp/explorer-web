import { useEffect } from 'react'

export const useAttachToWindow = (thing, keyName) => useEffect(() => {
  window[keyName] = thing
  return () => delete window[keyName]
}, [thing])
