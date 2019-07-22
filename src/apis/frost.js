export const FrostApi = (url, token) => ({
  url,
  endpoints,
  headers: {
    token,
  },
})

export const endpoints = {
  accounts: {
    get: true,
    find: true,
    post: true,
    patch: true,
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

// const accountPoeChallengePost = (issuer) => apiPost(`accounts/${issuer}/poe-challenge`)
// const accountVerify = (token) => apiFetch(`${apiUrl}/accounts/verify/${token}`, { headers: { token }})
