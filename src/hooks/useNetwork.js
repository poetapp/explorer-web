import { assertNetwork, isValidNetwork } from 'helpers/api'

import { usePersistedState } from './usePersistedState'

export const useNetwork = () => {
  const [network, setNetwork] = usePersistedState('network')

  const coercedNetwork = isValidNetwork(network) ? network : 'mainnet'

  const coercedSetNetwork = (network) => {
    assertNetwork(network)
    setNetwork(network)
  }

  return [coercedNetwork, coercedSetNetwork]
}
