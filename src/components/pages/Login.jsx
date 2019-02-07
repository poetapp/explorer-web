import React, { useState, useEffect, useContext } from 'react'

import { useLogin } from 'effects/useLogin'
import { SessionContext } from 'providers/SessionProvider'
import { Login as LoginOrganism } from 'components/organisms/Login'

export const Login = () => {
  const [credentials, setCredentials] = useState(null)
  const [_, setAccount] = useContext(SessionContext)
  const { account, error } = useLogin(credentials)

  useEffect(() => {
    if (account)
      setAccount(account)
  }, [account])

  error && console.error(error)

  return <LoginOrganism onSubmit={setCredentials} />
}
