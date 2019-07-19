import { flattenArray } from './array'
import { filtersToQueryParams } from './api'
import {mapObjectValues} from './object'

// export const ApiClient = (api) => {
//   const headers = {
//     'content-type': 'application/json; charset=utf-8',
//     ...api.headers,
//   }
//
//   const resources = apiDefinitionToFlat(api.endpoints).map(resource => ({
//     ...resource,
//     url: api.url + resource.url,
//     headers,
//   }))
//
//   const apiClient = resources.map(resource => ({
//     resource,
//     fetchArguments: (...args) => {
//       const fetchArguments = resourceDefinitionToFetchArguments(resource)(...args)
//       return fetchArguments
//     },
//   })).reduce((acc, val) => ({
//     ...acc,
//     [val.resource.resource]: {
//       ...acc[val.resource.resource],
//       [val.resource.method]: (...args) => {
//         const { url, init } = val.fetchArguments(...args)
//         return fetch(url, init)
//       },
//     },
//   }), {})
//
//   return apiClient
// }

export const ApiClient = (api) => mapObjectValues(
  api.endpoints,
  (resourceName, resource) => mapObjectValues(
    resource,
    (method, options) => resourceDefinitionToFetchArguments({
      url: api.url + '/' + (resource.url || resourceName),
      method,
      // options,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        ...api.headers,
      },
    }),
  )
)

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

const resourceDefinitionToFetchArguments = ({ url: baseUrl, method, headers }) => {
  const map = {
    get: id => ({
      url: `${baseUrl}/${id}`,
      init: {
        method: 'get',
        headers,
      },
    }),
    find: searchParams => ({
      url: `${baseUrl}?${filtersToQueryParams(searchParams)}`,
      init: {
        method: 'get',
        headers,
      },
    }),
    post: body => ({
      url: baseUrl,
      init: {
        method: 'post',
        body: JSON.stringify(body),
        headers,
      }
    }),
    put: (id, body) => ({
      url: `${baseUrl}/${id}`,
      init: {
        method: 'put',
        body: JSON.stringify(body),
        headers,
      }
    }),
    patch: (id, body) => ({
      url: `${baseUrl}/${id}`,
      init: {
        method: 'patch',
        body: JSON.stringify(body),
        headers,
      }
    }),
    delete: (id, body) => ({
      url: `${baseUrl}/${id}`,
      init: {
        method: 'delete',
        body: JSON.stringify(body),
        headers,
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

