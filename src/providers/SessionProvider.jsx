import React, { createContext, useState } from 'react'

export const SessionContext = createContext()

export const SessionProvider = props => {
  const [token, setToken] = useState(window.localStorage.getItem('session_token'))

  return (
    <SessionContext.Provider value={{token, setToken}}>
      { props.children }
    </SessionContext.Provider>
  )
}