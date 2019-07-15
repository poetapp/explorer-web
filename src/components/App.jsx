import React, { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

import { Router } from 'components/Router'
import { SessionProvider } from 'providers/SessionProvider'
import { ApiProvider } from 'providers/ApiProvider'

const x = () => {
  const [environment, setEnvironment] = useState('production')
  const [network, setNetwork] = useState('mainnet')

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
    console.log(`To change these use window.setEnvironment(environment), window.setNetwork(network), window.production() and window.qa().`)
  }, [])

  return [environment, network]
}

export const App = () => {
  const [environment, network] = x()

  return (
    <SessionProvider>
      <ApiProvider environment={environment} network={network}>
        <ToastContainer />
        <Router />
      </ApiProvider>
    </SessionProvider>
  )
}
