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
  window.production = () => {
    setEnvironment('production')
    setNetwork('mainnet')
  }
  window.qa = () => {
    setEnvironment('qa')
    setNetwork('testnet')
  }

  useEffect(() => {
    console.log(`Using API environment '${environment}' and network '${network}'.`)
  }, [environment, network])
  useEffect(() => {
    console.log(`To change these use window.setEnvironment(environment), window.setNetwork(network), window.production() and window.qa().`)
  }, [])

}