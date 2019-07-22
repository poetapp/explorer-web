import { withTotalCount } from 'helpers/array'
import { assertEnvironment } from 'helpers/api'
import { ApiClient } from 'helpers/ApiClient'

export const FrostApi = (environment, token) => ApiClient({
  url: environmentToUrl(environment),
  resources,
  headers: {
    token,
  },
  afterResponse: ({ status, headers, body }) => ({
    status,
    headers,
    body: Array.isArray(body)
      ? withTotalCount(body, headers.get('X-TOTAL-COUNT'))
      : body,
  })
})

const resources = {
  accounts: {
    get: true,
    find: true,
    post: true,
    patch: true,
// const accountPoeChallengePost = (issuer) => apiPost(`accounts/${issuer}/poe-challenge`)
// const accountVerify = (token) => apiFetch(`${apiUrl}/accounts/verify/${token}`, { headers: { token }})
  },
  login: {
    post: true,
  },
  tokens: {
    get: true,
    post: true,
    delete: true,
  },
  passwordReset: {
    url: '/password/reset',
    post: true,
  },
  passwordChangeWithToken: {
    url: '/password/change/token',
    post: true,
  },
  passwordChangeWithOld: {
    url: '/password/change',
    post: true,
  },
  works: {
    post: {
      // uses different auth (ApiKey)
    },
  },
  archives: {
    post: {
      // allow fetch to infer content-type
      // uses different auth (ApiKey)
    }
  },
}

const environmentToUrl = (environment) => {
  assertEnvironment(environment)
  const environmentPrefix = environment === 'production' ? '' : environment + '.'
  return `https://api.${environmentPrefix}poetnetwork.net`
}
