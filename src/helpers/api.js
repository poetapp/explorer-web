const isJSON = response => response.headers.get('content-type').split(';')[0] === 'application/json'

const parseResponseBody = response => isJSON(response) ? response.json() : response.text()

const parseResponse = async response => ({
  status: response.status,
  body: await parseResponseBody(response)
})

const contentTypeJSON = {
  'content-type': 'application/json; charset=utf-8'
}

export const Api = ({ token, onServerError, onClientError, onRequestStart, onRequestFinish }) => {
  const apiUrl = 'https://api.poetnetwork.net'

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

  const tokensUrl = `${apiUrl}/tokens`

  const getTokens = () => apiFetch(tokensUrl)
  const createToken = () => apiFetch(tokensUrl, { method: 'POST' })
  const deleteToken = (token) => apiFetch(`${tokensUrl}/${token}`, { method: 'DELETE' })

  const passwordUrl = `${apiUrl}/password`

  const passwordReset = (email) => apiFetch(`${passwordUrl}/reset`, { method: 'POST', body: JSON.stringify({ email }), headers: contentTypeJSON })
  const passwordChangeWithToken = (token, password) => apiFetch(`${passwordUrl}/change/token`, { method: 'POST', body: JSON.stringify({ password }), headers: { ...contentTypeJSON, token } })
  const passwordChangeWithOld = ({ oldPassword, password }) => apiFetch(`${passwordUrl}/change`, { method: 'POST', body: JSON.stringify({ password, oldPassword }), headers: { ...contentTypeJSON, token } })

  const createClaim = (claim) => apiFetch(`${apiUrl}/works`, { method: 'POST', body: JSON.stringify(claim), headers: contentTypeJSON })

  const login = (credentials) => apiFetch(`${apiUrl}/login`, { method: 'POST', body: JSON.stringify(credentials), headers: contentTypeJSON })

  return {
    getTokens,
    createToken,
    deleteToken,
    passwordReset,
    passwordChangeWithToken,
    passwordChangeWithOld,
    createClaim,
    login,
  }

}