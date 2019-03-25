import React, { useState, useEffect, createContext, useContext } from 'react'
import { toast } from 'react-toastify'

import { Api } from 'helpers/api'
import { useEnvironment } from 'hooks/useEnvironment'
import { useEnvironmentNetworkConsole } from 'hooks/useEnvironmentNetworkConsole'
import { useNetwork } from 'hooks/useNetwork'

import { SessionContext } from './SessionProvider'

export const ApiContext = createContext()

export const ApiProvider = props => {
  const [account, setAccount] = useContext(SessionContext)
  const [api, setApi] = useState(null)
  const [isBusy, setIsBusy] = useState(false)
  const [environment] = useEnvironment()
  const [network] = useNetwork()
  useEnvironmentNetworkConsole()

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
    setApi(Api({
      token: account?.token,
      onServerError,
      onClientError,
      onRequestStart,
      onRequestFinish,
      environment,
      network,
    }))
  }, [account])

  const useApi = (endpoint, ...args) => {
    const [response, setResponse] = useState()
    useEffect(() => {
      if (api && endpoint)
        api[endpoint](...args).then(setResponse)
    }, [api, endpoint])
    return response
  }

  return (
    <ApiContext.Provider value={[api, isBusy, useApi]}>
      { props.children }
    </ApiContext.Provider>
  )
}
