import { useEffect, useState } from 'react'

const parseResponse = response => isJSON(response) ? response.json() : response.text()

const isJSON = response => response.headers.get('content-type').split(';')[0] === 'application/json'

export const useFetch = (url, options) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    url && url.length && fetch(url, options)
      .then(parseResponse)
      .then(setData)
  }, [url])

  return data
}