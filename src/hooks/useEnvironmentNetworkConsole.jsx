import { useEffect } from 'react'

import { useEnvironment } from 'hooks/useEnvironment'
import { useNetwork } from 'hooks/useNetwork'

export const useEnvironmentNetworkConsole = () => {
  const [environment, setEnvironment] = useEnvironment()
  const [network, setNetwork] = useNetwork()

  window.network = network
  window.setNetwork = setNetwork
  window.environment = environment
  window.setEnvironment = setEnvironment

  useEffect(() => {
    console.log(`Using API environment '${environment}' and network '${network}'.`)
    console.log(`To change these use window.setEnvironment and window.setNetwork.`)
  }, [environment, network])

}