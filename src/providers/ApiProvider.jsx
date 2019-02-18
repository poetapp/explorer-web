import React, { useState, useEffect, createContext, useContext } from 'react'
import { toast } from 'react-toastify'

import { Api } from 'helpers/api'
import { SessionContext } from './SessionProvider'

export const ApiContext = createContext()

export const ApiProvider = props => {
  const [account, setAccount] = useContext(SessionContext)
  const [api, setApi] = useState(null)
  const [isBusy, setIsBusy] = useState(false)

  const clearAccount = () => setAccount(null)

  const onServerError =  ({ status, body, url, options }) => {
    console.error('API Error', 'Server Side', status, body, url, options)
    toast( body)
  }

  const onClientError = (error, url, options) => {
    console.error('API Error', 'Client Side', error, url, options)
    toast(error)
    clearAccount()
  }

  const onRequestStart = ({ url, options }) => {
    setIsBusy(true)
  }

  const onRequestFinish = ({ url, options }) => {
    setIsBusy(false)
  }

  useEffect(() => {
    setApi(Api({ token: account?.token, onServerError, onClientError, onRequestStart, onRequestFinish }))
  }, [account])

  return (
    <ApiContext.Provider value={[api, isBusy]}>
      { props.children }
    </ApiContext.Provider>
  )
}