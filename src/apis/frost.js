export const FrostApi = (url, token) => ({
  url,
  endpoints,
  headers: {
    token,
  },
})

export const endpoints = {
  accounts: {
    get: {
      // `${apiUrl}/accounts/${issuer}`
    },
    find: {
      // apiFetch(`${apiUrl}/accounts?${filtersToQueryParams(searchParams)}`)
    },
    post: {

    },
    patch: {
      // apiPatch(`accounts/${issuer}`)
    },
  },
  login: {
    post: {

    },
  },
  tokens: {
    get: true,
    post: true,
    delete: true,
  },
  passwordReset: {
    url: '/password/reset',
    post: {

    },
  },
  passwordChangeWithToken: {
    url: '/password/change/token',
    post: {

    },
  },
  passwordChangeWithOld: {
    url: '/password/change',
    post: {

    },
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
//
// const workGetById = (id) => apiFetch(`${nodeUrl}/works/${id}`)
// const worksGetByFilters = (filters = {}) => apiFetch(`${nodeUrl}/works?${filtersToQueryParams(filters)}`)
