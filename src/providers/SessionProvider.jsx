import React, { createContext, useState, useEffect } from 'react'

export const SessionContext = createContext()

export const SessionProvider = props => {
  const [token, setToken] = useState(window.localStorage.getItem('session_token'))

  useEffect(() => {
    window.localStorage.setItem('session_token', token)
  }, [token])

  return (
    <SessionContext.Provider value={[token, setToken]}>
      { props.children }
    </SessionContext.Provider>
  )
}