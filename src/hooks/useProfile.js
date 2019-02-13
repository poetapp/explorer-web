import { useEffect, useState } from 'react'

const url = 'https://api.poetnetwork.net/accounts/profile'

const fetchProfile = token => fetch(url, {
  method: 'GET',
  headers: {
    token,
  }
})

export const useProfile = token => {
  const [response, setResponse] = useState()
  const [error, setError] = useState()
  const [profile, setProfile] = useState()

  useEffect(() => {
    if (!token)
      return
    setError(null)
    setProfile(null)
    fetchProfile(token).then(setResponse)
  }, [token])

  useEffect(() => {
    if (!response)
     return
    if (response.status === 200) {
      response.json().then(setProfile)
    } else {
      setError(response.statusText)
    }
  }, [response])

  return { profile, error }
}