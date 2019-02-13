import React, { createContext } from 'react'

import { usePersistedState } from 'hooks/usePersistedState'

export const SessionContext = createContext()

const SessionToken = 'session'

export const SessionProvider = props => {
  const [account, setAccount] = usePersistedState(SessionToken)

  return (
    <SessionContext.Provider value={[account, setAccount]}>
      { props.children }
    </SessionContext.Provider>
  )
}