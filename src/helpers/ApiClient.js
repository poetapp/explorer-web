import { flattenArray } from './array'
import { filtersToQueryParams } from './api'

export const ApiClient = (api) => {
  const resources = apiDefinitionToFlat(api.endpoints).map(resource => ({
    ...resource,
    url: api.url + resource.url,
  }))

  const headers = {
    'content-type': 'application/json; charset=utf-8',
    ...api.headers,
  }

  // const resourceDefinitionToFunction = ({ baseUrl, method }) => {
  //   const {}
  // }

  const apiClient = resources.map(resource => ({
    resource,
    fetchArguments: (...args) => {
      const fetchArguments = resourceDefinitionToFetchArguments(resource)(...args)
      // return fetch(fetchArguments.url, fetchArguments.init)
      return fetchArguments
    },
  }))

  return apiClient
}

const apiDefinitionToFlat = (resources) => {
  const apiClient = Object.entries(resources)
    .map(([endpoint, endpointOptions]) => ({
      endpoint,
      endpointOptions,
    }))
    .map(({ endpoint, endpointOptions }) => (
      Object
        .entries(endpointOptions)
        .filter(filterOperations)
        .map(([ method, options ]) => ({ method, options }))
        .map(({ method, options }) => ({
          resource: endpoint,
          url: endpointOptions.url || '/' + endpoint,
          method,
          options,
        }))
    ))
  return flattenArray(apiClient)
}

const operations = ['get', 'find', 'post', 'put', 'patch', 'delete']

const endpointOptionIsOperation = (operation) => operations.includes(operation)

const filterOperations = ([operation]) => endpointOptionIsOperation(operation)

const resourceDefinitionToFetchArguments = ({ url: baseUrl, method }) => {
  const map = {
    get: id => ({
      url: `${baseUrl}/${id}`,
      init: {
        method: 'get',
      },
    }),
    find: searchParams => ({
      url: `${baseUrl}?${filtersToQueryParams(searchParams)}`,
      init: {
        method: 'get',
      },
    }),
    post: body => ({
      url: baseUrl,
      init: {
        method: 'post',
        body: JSON.stringify(body)
      }
    }),
    put: (id, body) => ({
      url: `${baseUrl}/${id}`,
      init: {
        method: 'put',
        body: JSON.stringify(body)
      }
    }),
    patch: (id, body) => ({
      url: `${baseUrl}/${id}`,
      init: {
        method: 'patch',
        body: JSON.stringify(body)
      }
    }),
    delete: (id, body) => ({
      url: `${baseUrl}/${id}`,
      init: {
        method: 'delete',
        body: JSON.stringify(body)
      }
    }),
  }
  return map[method]
}

// const usage =  async (apiClient) => {
//   const account = await apiClient.accounts.get('issuer')
//   const accounts = await apiClient.accounts.find({ issuer: 'issuer' })
//   const createdAccount = await apiClient.accounts.post({ email: 'email@domain.com' })
//   const patchedAccount = await apiClient.accounts.patch('issuer', { poeAddress: 'poeAddress' })
// }
