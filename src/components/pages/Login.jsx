import React, { useState, useEffect, useContext } from 'react'

import { SessionContext } from 'providers/SessionProvider'
import { Login as LoginOrganism } from 'components/organisms/Login'

const url = 'https://api.poetnetwork.net/login'

const fetchLogin = credentials => fetch(url, {
  method: 'POST',
  body: JSON.stringify(credentials),
  headers: {
    'content-type': 'application/json; charset=utf-8'
  }
})

const useLogin = credentials => {
  const [response, setResponse] = useState()
  const [error, setError] = useState()
  const [token, setToken] = useState()

  useEffect(() => {
    if (!credentials)
      return
    setError(null)
    setToken(null)
    fetchLogin(credentials).then(setResponse)
  }, [credentials])

  useEffect(() => {
    if (response) {
      if (response.status === 200) {
        response.json().then(_ => _.token).then(setToken)
      } else {
        setError(response.statusText)
      }
    }
  }, [response])

  return { token, error }
}

export const Login = () => {
  const [credentials, setCredentials] = useState(null)
  const [contextToken, setToken] = useContext(SessionContext)
  const { token, error } = useLogin(credentials)

  const onSubmit = credentials => {
    setCredentials(credentials)
  }

  useEffect(() => {
    if (token)
      setToken(token)
  }, [token])

  console.log('contextToken', contextToken)
  console.log('token', token)
  console.log('error', error)

  return <LoginOrganism onSubmit={onSubmit} />
}
