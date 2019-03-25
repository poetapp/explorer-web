import { useEffect } from 'react'

import { usePersistedState } from './usePersistedState'
import {isValidEnvironment} from '../helpers/api'

export const useEnvironment = () => {
  const [environment, setEnvironment] = usePersistedState('environment')

  const coercedEnvironment = isValidEnvironment(environment) ? environment : 'production'

  useAttatchToWindow(coercedEnvironment, 'environment')
  useAttatchToWindow(setEnvironment, 'setEnvironment')

  return [coercedEnvironment, setEnvironment]
}

const useAttatchToWindow = (thing, keyName) => useEffect(() => {
  window[keyName] = thing
  return () => delete window[keyName]
}, [thing])
