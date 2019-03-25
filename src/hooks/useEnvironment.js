import { assertEnvironment, isValidEnvironment} from 'helpers/api'

import { useAttachToWindow } from './useAttachToWindow'
import { usePersistedState } from './usePersistedState'

export const useEnvironment = () => {
  const [environment, setEnvironment] = usePersistedState('environment')

  const coercedEnvironment = isValidEnvironment(environment) ? environment : 'production'

  const coercedSetEnvironment = (environment) => {
    assertEnvironment(environment)
    setEnvironment(environment)
  }

  useAttachToWindow(coercedEnvironment, 'environment')
  useAttachToWindow(coercedSetEnvironment, 'setEnvironment')

  return [coercedEnvironment, coercedSetEnvironment]
}
