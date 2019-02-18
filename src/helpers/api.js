const isJSON = response => response.headers.get('content-type').split(';')[0] === 'application/json'

const parseResponseBody = response => isJSON(response) ? response.json() : response.text()

const parseResponse = async response => ({
  status: response.status,
  body: await parseResponseBody(response)
})

export const Api = ({ token, onServerError, onClientError, onRequestStart, onRequestFinish }) => {

  const authenticatedFetch = (requestInfo, requestInit = { headers: {}}) => fetch(requestInfo, {
    ...requestInit,
    headers: {
      token,
      ...requestInit.headers,
    }
  })

  const processParsedResponse = ({ url, options }) => ({ status, body }) => {
    if (status === 200) {
      return body
    } else {
      onServerError({ status, body, url, options })
    }
  }

  const apiFetch = (url, options) => {
    onRequestStart({ url, options })
    return authenticatedFetch(url, options)
      .then(parseResponse)
      .then(processParsedResponse({ url, options }))
      .catch(error => onClientError(error, url, options))
      .then(_ => {
        onRequestFinish({ url, options })
        return _
      })
  }

  const tokensUrl = 'https://api.poetnetwork.net/tokens'

  const getTokens = () => apiFetch(tokensUrl)

  const createToken = () => apiFetch(tokensUrl, { method: 'POST' })

  return {
    getTokens,
    createToken,
  }

}