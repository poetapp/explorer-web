import React, { useState, useEffect } from 'react'

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
  const [response, setResponse] = useState()
  const [token, setToken] = useState()
  const [error, setError] = useState()
  const [credentials, setCredentials] = useState(null)

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
    window.localStorage.setItem('session_token', token)
  }, [token])

  useEffect(() => {
    console.log('effect.error', error)
  }, [error])

  return <LoginOrganism onSubmit={onSubmit} />
}
