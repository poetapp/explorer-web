import { withTotalCount } from 'helpers/array'

const isJSON = response => response.headers.get('content-type').split(';')[0] === 'application/json'

const parseResponseBody = response => isJSON(response) ? response.json() : response.text()

const parseResponse = async response => ({
  status: response.status,
  body: await parseResponseBody(response),
  headers: response.headers,
})

const contentTypeJSON = {
  'content-type': 'application/json; charset=utf-8'
}

const fetchWithToken = token => (requestInfo, requestInit = { headers: {}}) => fetch(requestInfo, {
  ...requestInit,
  headers: {
    ...requestInit.headers,
    token: requestInit?.headers?.token || token,
  }
})

export const Api = ({
  token,
  onServerError,
  onClientError,
  onRequestStart,
  onRequestFinish,
  environment = 'production',
  network = 'mainnet',
}) => {
  const { apiUrl, nodeUrl } = environmentToUrls(environment, network)

  const authenticatedFetch = token !== undefined ? fetchWithToken(token) : fetch

  const processParsedResponse = ({ url, options }) => ({ status, body, headers }) => {
    if (status === 200) {
      return Array.isArray(body)
        ? withTotalCount(body, headers.get('X-TOTAL-COUNT'))
        : body
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

  const apiPost = (resource) => (json, token) => apiFetch(`${apiUrl}/${resource}`, { method: 'POST', body: JSON.stringify(json), headers: { ...contentTypeJSON, token } })
  const apiPatch = (resource) => (json, token) => apiFetch(`${apiUrl}/${resource}`, { method: 'PATCH', body: JSON.stringify(json), headers: { ...contentTypeJSON, token } })

  const tokensUrl = `${apiUrl}/tokens`

  const getTokens = () => apiFetch(tokensUrl)
  const createToken = (network = 'live') => apiFetch(tokensUrl, { method: 'POST', body: JSON.stringify({ network }), headers: contentTypeJSON })
  const deleteToken = (token) => apiFetch(`${tokensUrl}/${token}`, { method: 'DELETE' })

  const passwordUrl = `${apiUrl}/password`

  const passwordReset = apiPost('password/reset')
  const passwordChangeWithToken = (token, password) => apiFetch(`${passwordUrl}/change/token`, { method: 'POST', body: JSON.stringify({ password }), headers: { ...contentTypeJSON, token } })
  const passwordChangeWithOld = ({ oldPassword, password }) => apiFetch(`${passwordUrl}/change`, { method: 'POST', body: JSON.stringify({ password, oldPassword }), headers: { ...contentTypeJSON, token } })

  const createClaim = apiPost('works')

  const accountCreate = apiPost('accounts')
  const accountGet = (issuer) => apiFetch(`${apiUrl}/accounts/${issuer}`)
  const accountFind = (searchParams) => apiFetch(`${apiUrl}/accounts?${filtersToQueryParams(searchParams)}`)
  const accountPatch = (issuer) => apiPatch(`accounts/${issuer}`)
  const accountPoeChallengePost = (issuer) => apiPost(`accounts/${issuer}/poe-challenge`)

  const login = apiPost('login')
  const accountVerify = (token) => apiFetch(`${apiUrl}/accounts/verify/${token}`, { headers: { token }})

  const workGetById = (id) => apiFetch(`${nodeUrl}/works/${id}`)
  const worksGetByFilters = (filters = {}) => apiFetch(`${nodeUrl}/works?${filtersToQueryParams(filters)}`)

  const postArchive = (file, token) => apiFetch(`${apiUrl}/archives`, { method: 'POST', body: file, headers: { token } })

  return {
    token,

    getTokens,
    createToken,
    deleteToken,
    passwordReset,
    passwordChangeWithToken,
    passwordChangeWithOld,
    createClaim,
    login,
    accountVerify,
    accountCreate,
    accountGet,
    accountFind,
    accountPatch,
    accountPoeChallengePost,
    workGetById,
    worksGetByFilters,
    postArchive,
  }

}

export const filtersToQueryParams = (filters) => Object.entries(filters).map(([key, value]) => `${key}=${value}`).join('&')

const environmentToUrls = (environment, network) => {
  assertEnvironment(environment)

  const environmentPrefix = environment === 'production' ? '' : environment + '.'

  const apiUrl = environment !== 'local' ? `https://api.${environmentPrefix}poetnetwork.net` : 'http://localhost:3000'
  const nodeUrl = environment !== 'local' ? `https://${network}.${environmentPrefix}poetnetwork.net` : 'http://localhost:18080'

  return {
    apiUrl,
    nodeUrl,
  }
}

export const validEnvironments = ['production', 'qa', 'local']

export const isValidEnvironment = (environment) => validEnvironments.includes(environment)

export const assertEnvironment = (environment) => {
  if (!isValidEnvironment(environment))
    throw new Error(`Argument environment can't be '${environment}'. Must be one of [${validEnvironments.join(', ')}].`)
}

export const validNetworks = ['mainnet', 'testnet', 'regtest', 'local']

export const isValidNetwork = network => validNetworks.includes(network)

export const assertNetwork = (network) => {
  if (!isValidNetwork(network))
    throw new Error(`Argument network can't be '${network}'. Must be one of [${validNetworks.join(', ')}].`)
}
