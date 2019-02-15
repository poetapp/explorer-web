import { useState, useEffect } from 'react'

const fetchTokens = token => fetch(`https://api.poetnetwork.net/tokens`, {
  headers: {
    token,
  }
})

export const useTokens = (parentToken) => {
  const [response, setResponse] = useState()
  const [tokens, setTokens] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    if (parentToken)
      fetchTokens(parentToken).then(setResponse).catch(setError)
  }, [parentToken])

  useEffect(() => {
    if (!response)
      return
    if (response.status === 200) {
      response.json().then(_ => _.apiTokens).then(setTokens)
    } else {
      setError(response.statusText)
    }
  }, [response])

  return [tokens, error]
}