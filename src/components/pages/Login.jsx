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

export const Login = () => {
  const [credentials, setCredentials] = useState(null)
  const [response, setResponse] = useState()
  const [error, setError] = useState()
  const [token, setToken] = useContext(SessionContext)

  const onSubmit = credentials => {
    setCredentials(credentials)
  }

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

  useEffect(() => {
    console.log('effect.token', token)
  }, [token])

  useEffect(() => {
    console.log('effect.error', error)
  }, [error])

  return <LoginOrganism onSubmit={onSubmit} />
}
