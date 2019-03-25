import { useEnvironment } from 'hooks/useEnvironment'
import { useNetwork } from 'hooks/useNetwork'

export const useEnvironmentNetworkConsole = () => {
  const [environment, setEnvironment] = useEnvironment()
  const [network, setNetwork] = useNetwork()

  window.network = network
  window.setNetwork = setNetwork
  window.environment = environment
  window.setEnvironment = setEnvironment

}