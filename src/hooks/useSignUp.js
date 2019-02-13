import { useEffect, useState } from 'react'

const url = 'https://api.poetnetwork.net/accounts'

const fetchSignUp = credentials => fetch(url, {
  method: 'POST',
  body: JSON.stringify(credentials),
  headers: {
    'content-type': 'application/json; charset=utf-8'
  }
})

export const useSignUp = credentials => {
  const [response, setResponse] = useState()
  const [error, setError] = useState()
  const [account, setAccount] = useState()

  useEffect(() => {
    if (!credentials)
      return
    setError(null)
    setAccount(null)
    fetchSignUp(credentials).then(setResponse)
  }, [credentials])

  const setAccountWithToken = ({ email }) => token => setAccount({ email, token })

  useEffect(() => {
    if (response) {
      if (response.status === 200) {
        response.json().then(_ => _.token).then(setAccountWithToken(credentials))
      } else {
        setError(response.statusText)
      }
    }
  }, [response])

  return { account, error }
}