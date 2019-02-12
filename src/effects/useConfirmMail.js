import {useEffect, useState} from 'react'

export const useConfirmEmail = token => {
  const [response, setResponse] = useState()
  const [loginToken, setLoginToken] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    fetch(`https://api.poetnetwork.net/accounts/verify/${token}`)
      .then(setResponse)
  }, [])

  useEffect(() => {
    if (!response)
      return

    if (response.ok)
      response.json().then(_ => _.token).then(setLoginToken)
    else
      response.text().then(setError)
  }, [response])

  return { loginToken, error }
}