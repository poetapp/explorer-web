import React, { useState, useEffect, useContext, createContext } from 'react'

import { SessionContext } from './SessionProvider'

export const ApiEnvironmentContext = createContext()

export const ApiEnvironmentProvider = (props) => {
  const [environment, setEnvironment] = useState('production')
  const [network, setNetwork] = useState('mainnet')
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
