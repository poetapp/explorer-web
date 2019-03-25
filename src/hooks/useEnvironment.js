import { assertEnvironment, isValidEnvironment} from 'helpers/api'

import { usePersistedState } from './usePersistedState'

export const useEnvironment = () => {
  const [environment, setEnvironment] = usePersistedState('environment')

  const coercedEnvironment = isValidEnvironment(environment) ? environment : 'production'

  const coercedSetEnvironment = (environment) => {
    assertEnvironment(environment)
    setEnvironment(environment)
  }

  return [coercedEnvironment, coercedSetEnvironment]
}
