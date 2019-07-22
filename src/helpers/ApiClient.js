import { filtersToQueryParams } from './api'
import { mapObjectEntries, filterObjectEntries } from './object'

export const ApiClient = (api, processParsedResponse) => {
  const fetchArguments = apiToFetchArguments(api)

  const processParsedResponseWrapper = _ => {
    if (processParsedResponse)
      return processParsedResponse(_)
    return _.body
  }

  return mapObjectEntries(
    fetchArguments,
    (resourceName, resource) => mapObjectEntries(
      resource,
      (method, getFetchArguments) => (...args) => {
        const { url, init } = getFetchArguments(...args)
        return fetch(url, init)
          .then(parseResponse)
          .then(processParsedResponseWrapper)
      }
    )
  )
}

const apiToFetchArguments = (api) => mapObjectEntries(
  api.endpoints,
  (resourceName, resource) => mapObjectEntries(
    filterObjectEntries(resource, filterOperations),
    (method, options) => resourceDefinitionToFetchArguments({
      url: api.url + (resource.url || '/' + resourceName),
      method,
      // options,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        ...api.headers,
      },
    }),
  )
)

const filterOperations = ([operation]) => endpointOptionIsOperation(operation)

const endpointOptionIsOperation = (operation) => operations.includes(operation)

const operations = ['get', 'find', 'post', 'put', 'patch', 'delete']

const resourceDefinitionToFetchArguments = ({ url, method, headers }) => {
  switch (method) {
    case 'get':
      return id => ({
        url: `${url}/${id}`,
        init: {
          method,
          headers,
        },
      })
    case 'find':
      return searchParams => ({
        url: `${url}?${filtersToQueryParams(searchParams)}`,
        init: {
          method: 'get',
          headers,
        },
      })
    case 'post':
      return body => ({
        url,
        init: {
          method,
          headers,
          body: JSON.stringify(body),
        }
      })
    case 'put':
      return (id, body) => ({
        url: `${url}/${id}`,
        init: {
          method,
          headers,
          body: JSON.stringify(body),
        }
      })
    case 'patch':
      return (id, body) => ({
        url: `${url}/${id}`,
        init: {
          method,
          headers,
          body: JSON.stringify(body),
        }
      })
    case 'delete':
      return (id, body) => ({
        url: `${url}/${id}`,
        init: {
          method,
          headers,
          body: JSON.stringify(body),
        }
      })
  }
}

const isJSON = response => response.headers.get('content-type').split(';')[0] === 'application/json'

const parseResponseBody = response => isJSON(response) ? response.json() : response.text()

const parseResponse = async response => ({
  status: response.status,
  body: await parseResponseBody(response),
  headers: response.headers,
})

// const usage =  async (apiClient) => {
//   const account = await apiClient.accounts.get('issuer')
//   const accounts = await apiClient.accounts.find({ issuer: 'issuer' })
//   const createdAccount = await apiClient.accounts.post({ email: 'email@domain.com' })
//   const patchedAccount = await apiClient.accounts.patch('issuer', { poeAddress: 'poeAddress' })
// }

