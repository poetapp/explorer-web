import { useState, useEffect, useDebugValue } from 'react'

const url = 'https://api.poetnetwork.net/tokens'

export const getTokens = token => fetch(url, {
  headers: {
    token,
  }
})

const createToken = token => fetch(url, {
  method: 'POST',
  headers: {
    token,
  }
})

export const useTokens = (parentToken) => {
  const [response, setResponse] = useState()
  const [tokens, setTokens] = useState()
  const [serverError, setServerError] = useState()
  const [clientError, setClientError] = useState()

  useEffect(() => {
    if (parentToken)
      getTokens(parentToken).then(setResponse).catch(setClientError)
  }, [parentToken])

  useEffect(() => {
    if (!response)
      return
    if (response.status === 200) {
      response.json().then(_ => _.apiTokens).then(setTokens)
    } else {
      setServerError(response.statusText)
    }
  }, [response])

  return [tokens, serverError, clientError]
}

export const useCreateToken = (parentToken) => {
  const [response, setResponse] = useState()
  const [tokens, setTokens] = useState()
  const [serverError, setServerError] = useState()
  const [clientError, setClientError] = useState()

  useDebugValue(parentToken)

  useEffect(() => {
    if (parentToken)
      createToken(parentToken).then(setResponse).catch(setClientError)
  }, [parentToken])

  useEffect(() => {
    if (!response)
      return
    if (response.status === 200) {
      response.json().then(setTokens)
    } else {
      response.text().then(setServerError)
    }
  }, [response])

  return [tokens, serverError, clientError]
}