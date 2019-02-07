import React, { useState, useEffect, useContext } from 'react'

import { useLogin } from 'effects/useLogin'
import { SessionContext } from 'providers/SessionProvider'
import { Login as LoginOrganism } from 'components/organisms/Login'

export const Login = () => {
  const [credentials, setCredentials] = useState(null)
  const [_, setToken] = useContext(SessionContext)
  const { token, error } = useLogin(credentials)

  useEffect(() => {
    if (token)
      setToken(token)
  }, [token])

  error && console.error(error)

  return <LoginOrganism onSubmit={setCredentials} />
}
