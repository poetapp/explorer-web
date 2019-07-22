import React, { useState, useEffect, createContext, useContext } from 'react'
import { toast } from 'react-toastify'

import { FrostApi } from 'apis/frost'
import { Api } from 'helpers/api'

import { SessionContext } from './SessionProvider'
import { ApiEnvironmentContext } from './ApiEnvironmentProvider'

export const ApiContext = createContext()

export const ApiProvider = props => {
  const [account, setAccount] = useContext(SessionContext)
  const [environment, network] = useContext(ApiEnvironmentContext)
  const [api, setApi] = useState(null)
  const [isBusy, setIsBusy] = useState(false)
  const [frostApi, setFrostApi] = useState(false)

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
    if (!isValidEnvironmentNetworkCombination(environment, network))
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
    setFrostApi(FrostApi(environment, account?.token))
  }, [account, environment, network])

  const useApi = (endpoint, ...args) => {
    const [response, setResponse] = useState()
    useEffect(() => {
      if (api && endpoint)
        api[endpoint](...args).then(setResponse)
    }, [api, endpoint])
    return response
  }

  return (
    <ApiContext.Provider value={[api, isBusy, useApi, environment, network, frostApi]}>
      { props.children }
    </ApiContext.Provider>
  )
}

const isValidEnvironmentNetworkCombination = (environment, network) =>
  !(environment === 'qa' && network === 'mainnet')
