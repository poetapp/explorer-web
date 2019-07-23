import { identity } from 'ramda'

import { filtersToQueryParams } from './api'
import { mapObjectEntries, filterObjectEntries } from './object'
import { asyncPipe, unaryFetch } from './functional'

export const ApiClient = ({
  url,
  headers,
  resources,
  afterResponse = identity,
}) => {
  const pickBody = ({ body }) => body

  const makeUrl = (resourceName, resource) => ({ url: operationUrl = '', init }) => ({
    url: url + (resource.url || '/' + resourceName) + operationUrl,
    init,
  })

  const makeHeaders = (resource, options) => ({ url, init }) => ({
    url,
    init: {
      ...init,
      headers: { ...headers, ...resource.headers, ...options.headers },
    }
  })

  const addMethod = (method) => ({ url, init }) => ({
    url,
    init: {
      method,
      ...init,
    }
  })

  const resourceOperationToFetch = (resourceName, resource) => (method, options) => asyncPipe(
    operationToFetchArguments(method),
    makeUrl(resourceName, resource),
    makeHeaders(resource, options),
    addMethod(method),
    unaryFetch,
    parseResponse,
    afterResponse,
    pickBody
  )

  const resourceToFetch = (resourceName, resource) => mapObjectEntries(
    filterObjectEntries(resource, resourceEntryIsOperation),
    resourceOperationToFetch(resourceName, resource)
  )

  return mapObjectEntries(
    resources,
    resourceToFetch,
  )
}

const resourceEntryIsOperation = ([operation]) => resourceOptionIsOperation(operation)

const resourceOptionIsOperation = (operation) => operations.includes(operation)

const operations = ['get', 'find', 'post', 'put', 'patch', 'delete']

const operationToFetchArguments = (method) => {
  switch (method) {
    case 'get':
      return id => ({
        url: `/${id}`,
      })
    case 'find':
      return searchParams => ({
        url: `?${filtersToQueryParams(searchParams)}`,
        init: {
          method: 'get',
        },
      })
    case 'post':
      return body => ({
        init: {
          body: JSON.stringify(body),
        }
      })
    case 'put':
      return (id, body) => ({
        url: `/${id}`,
        init: {
          body: JSON.stringify(body),
        }
      })
    case 'patch':
      return (id, body) => ({
        url: `/${id}`,
        init: {
          body: JSON.stringify(body),
        }
      })
    case 'delete':
      return (id, body) => ({
        url: `/${id}`,
        init: {
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
