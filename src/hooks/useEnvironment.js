import { useAttatchToWindow } from './useAttachToWindow'
import { usePersistedState } from './usePersistedState'
import { assertEnvironment, isValidEnvironment} from '../helpers/api'

export const useEnvironment = () => {
  const [environment, setEnvironment] = usePersistedState('environment')

  const coercedEnvironment = isValidEnvironment(environment) ? environment : 'production'

  const coercedSetEnvironment = (environment) => {
    assertEnvironment(environment)
    setEnvironment(environment)
  }

  useAttatchToWindow(coercedEnvironment, 'environment')
  useAttatchToWindow(coercedSetEnvironment, 'setEnvironment')

  return [coercedEnvironment, coercedSetEnvironment]
}
