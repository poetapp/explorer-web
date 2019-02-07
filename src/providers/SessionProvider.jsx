import React, { createContext } from 'react'

import { usePersistedState } from 'effects/usePersistedState'

export const SessionContext = createContext()

const SessionToken = 'session_token'

export const SessionProvider = props => {
  const [token, setToken] = usePersistedState(SessionToken)

  return (
    <SessionContext.Provider value={[token, setToken]}>
      { props.children }
    </SessionContext.Provider>
  )
}