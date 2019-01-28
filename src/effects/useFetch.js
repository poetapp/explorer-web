import { useEffect, useState } from 'react'

const fetchResponse = isJSON => response => isJSON ? response.json() : response.text()

export const useFetch = (url, isJSON = true) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    url && url.length && fetch(url)
      .then(fetchResponse(isJSON))
      .then(setData)
  }, [url])

  return data
}