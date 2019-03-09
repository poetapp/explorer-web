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

  const apiPost = (resource) => (json) => apiFetch(`${apiUrl}/${resource}`, { method: 'POST', body: JSON.stringify(json), headers: contentTypeJSON })

  const tokensUrl = `${apiUrl}/tokens`

  const getTokens = () => apiFetch(tokensUrl)
  const createToken = () => apiFetch(tokensUrl, { method: 'POST' })
  const deleteToken = (token) => apiFetch(`${tokensUrl}/${token}`, { method: 'DELETE' })

  const passwordUrl = `${apiUrl}/password`

  const passwordReset = apiPost('password/reset')
  const passwordChangeWithToken = (token, password) => apiFetch(`${passwordUrl}/change/token`, { method: 'POST', body: JSON.stringify({ password }), headers: { ...contentTypeJSON, token } })
  const passwordChangeWithOld = ({ oldPassword, password }) => apiFetch(`${passwordUrl}/change`, { method: 'POST', body: JSON.stringify({ password, oldPassword }), headers: { ...contentTypeJSON, token } })

  const createClaim = apiPost('works')

  const accountCreate = apiPost('accounts')
  const login = apiPost('login')

  return {
    getTokens,
    createToken,
    deleteToken,
    passwordReset,
    passwordChangeWithToken,
    passwordChangeWithOld,
    createClaim,
    login,
    accountCreate,
  }

}