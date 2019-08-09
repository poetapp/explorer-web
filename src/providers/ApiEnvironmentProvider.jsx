import React, { useEffect, useContext, createContext } from 'react'

import { usePersistedState } from 'hooks/usePersistedState'

import { SessionContext } from './SessionProvider'

export const ApiEnvironmentContext = createContext()

export const ApiEnvironmentProvider = (props) => {
  const [environment, setEnvironment] = usePersistedState('environment')
  const [network, setNetwork] = usePersistedState('network')
  const [account, setAccount] = useContext(SessionContext)

  useEffect(() => {
    window.setEnvironment = setEnvironment
    window.setNetwork = setNetwork

    window.production = () => {
      setEnvironment('production')
      setNetwork('mainnet')
    }
    window.qa = () => {
      setEnvironment('qa')
      setNetwork('testnet')
    }
  }, [setEnvironment, setNetwork])

  useEffect(() => {
    window.environment = environment
    window.network = network
    console.log(`Using API environment '${environment}' and network '${network}'.`)
  }, [environment, network])

  useEffect(() => {
     if (account && environment !== account?.environment)
    setAccount(undefined)
  }, [environment])

  useEffect(() => {
    console.log(`To change these use window.setEnvironment(environment), window.setNetwork(network), window.production() and window.qa().`)
  }, [])

  return (
    <ApiEnvironmentContext.Provider value={[environment, network]}>
      { props.children }
    </ApiEnvironmentContext.Provider>
  )
}
