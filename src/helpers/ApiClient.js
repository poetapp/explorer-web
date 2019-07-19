import { flattenArray } from './array'

export const ApiClient = api => {
  const apiClient = apiDefinitionToFlat(api)
  return apiClient
}

const apiDefinitionToFlat = (api) => {
  const apiClient = Object.entries(api.endpoints)
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

const filterOperations = ([operation, operationConfiguration]) => endpointOptionIsOperation(operation)

// const usage =  async (apiClient) => {
//   const account = await apiClient.accounts.get('issuer')
//   const accounts = await apiClient.accounts.find({ issuer: 'issuer' })
//   const createdAccount = await apiClient.accounts.post({ email: 'email@domain.com' })
//   const patchedAccount = await apiClient.accounts.patch('issuer', { poeAddress: 'poeAddress' })
// }
