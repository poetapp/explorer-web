import { filtersToQueryParams } from './api'
import { mapObjectEntries, filterObjectEntries } from './object'

export const asyncPipe = (...fns) =>
  (v) => fns.reduce(async (a, c) => c(await a), Promise.resolve(v))

const unaryFetch = ({ url, init}) => fetch(url, init)

export const ApiClient = ({
  url,
  headers,
  resources,
  afterResponse = _ => _,
}) => {
  const takeBody = ({ body }) => body

  const apiInit = (init) => ({
    ...init,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...init.headers,
      ...headers,
    }
  })

  const addApiFetchArguments = ({ url: operationUrl, init }) => ({ url: url + operationUrl, init: apiInit(init) })

  const resourceOperationToFetch = (resourceName, resource) => (method, options) => asyncPipe(
    resourceDefinitionToFetchArguments({
      url: resource.url || '/' + resourceName,
      method,
      // headers: { ...resource.headers, ...options.headers },
    }),
    addApiFetchArguments,
    unaryFetch,
    parseResponse,
    afterResponse,
    takeBody
  )

  const resourceToFetch = (resourceName, resource) => mapObjectEntries(
    filterObjectEntries(resource, resourceEntryIsOperation),
    resourceOperationToFetch(resourceName, resource)
  )

  return mapObjectEntries(
    resources,
    resourceToFetch,
  )

  // return resources.mapEntries(
  //   (resourceName, resource) => resource
  //     .filterEntries(resourceEntryIsOperation)
  //     .mapEntries(resourceOperationToFetch(resourceName, resource))
  // )
}

const resourceEntryIsOperation = ([operation]) => resourceOptionIsOperation(operation)

const resourceOptionIsOperation = (operation) => operations.includes(operation)

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
