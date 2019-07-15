import React, { useState, useEffect, createContext, useContext } from 'react'
import { toast } from 'react-toastify'

import { Api } from 'helpers/api'

import { SessionContext } from './SessionProvider'

export const ApiContext = createContext()

export const ApiProvider = props => {
  const [account, setAccount] = useContext(SessionContext)
  const [api, setApi] = useState(null)
  const [isBusy, setIsBusy] = useState(false)
  const [environment, setEnvironment] = useState('production')
  const [network, setNetwork] = useState('mainnet')

  const clearAccount = () => setAccount(null)

  const onServerError =  ({ status, body, url, options }) => {
    console.error('API Error', 'Server Side', status, body, url, options)
    toast.error( body)
  }

  const onClientError = (error, url, options) => {
    console.error('API Error', 'Client Side', error, url, options)
    toast.error('Oops, something went wrong!')
    clearAccount()
  }

  const onRequestStart = ({ url, options }) => {
    setIsBusy(true)
  }

  const onRequestFinish = ({ url, options }) => {
    setIsBusy(false)
  }

  useEffect(() => {
    if (environment === 'qa' && network === 'mainnet')
      return
    setApi(Api({
      token: account?.token,
      onServerError,
      onClientError,
      onRequestStart,
      onRequestFinish,
      environment,
      network,
    }))
  }, [account, environment, network])

  const useApi = (endpoint, ...args) => {
    const [response, setResponse] = useState()
    useEffect(() => {
      if (api && endpoint)
        api[endpoint](...args).then(setResponse)
    }, [api, endpoint])
    return response
  }

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

  return (
    <ApiContext.Provider value={[api, isBusy, useApi]}>
      { props.children }
    </ApiContext.Provider>
  )
}
