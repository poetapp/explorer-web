import { useEffect, useState } from 'react'

const url = 'https://api.poetnetwork.net/login'

const fetchLogin = credentials => fetch(url, {
  method: 'POST',
  body: JSON.stringify(credentials),
  headers: {
    'content-type': 'application/json; charset=utf-8'
  }
})

export const useLogin = credentials => {
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