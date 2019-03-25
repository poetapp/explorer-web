import { useAttachToWindow } from './useAttachToWindow'
import { usePersistedState } from './usePersistedState'
import { assertNetwork, isValidNetwork } from '../helpers/api'

export const useNetwork = () => {
  const [network, setNetwork] = usePersistedState('network')

  const coercedNetwork = isValidNetwork(network) ? network : 'mainnet'

  const coercedSetNetwork = (network) => {
    assertNetwork(network)
    setNetwork(network)
  }

  useAttachToWindow(coercedNetwork, 'network')
  useAttachToWindow(coercedSetNetwork, 'setNetwork')

  return [coercedNetwork, coercedSetNetwork]
}
