import React, { useState, useEffect, createContext, useContext } from 'react'

import { Api } from 'helpers/api'
import { SessionContext } from './SessionProvider'

export const ApiContext = createContext()

export const ApiProvider = props => {
  const [account, setAccount] = useContext(SessionContext)
  const [api, setApi] = useState(null)

  const clearAccount = () => setAccount(null)

  const onServerError =  ({ status, body, url, options }) => {
    console.error('API Error', 'Server Side', status, body, url, options)
  }

  const onClientError = (error, url, options) => {
    console.error('API Error', 'Client Side', error, url, options)
    clearAccount()
  }

  useEffect(() => {
    setApi(Api({ token: account?.token, onServerError, onClientError }))
  }, [account, setAccount])


  return (
    <ApiContext.Provider value={api}>
      { props.children }
    </ApiContext.Provider>
  )
}