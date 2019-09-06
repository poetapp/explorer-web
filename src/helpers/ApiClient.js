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

  const addHeaders = (resource, options) => ({ url, init }) => ({
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
    operationToFetchArguments[method],
    makeUrl(resourceName, resource),
    addHeaders(resource, options),
    addMethod(method),
    unaryFetch,
    parseResponse,
    afterResponse,
    pickBody,
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

const operationToFetchArguments = {
  'get': id => ({
    url: `/${id}`,
  }),
  'find': searchParams => ({
    url: `?${filtersToQueryParams(searchParams)}`,
    init: {
      method: 'get',
    },
  }),
  'post': body => ({
    init: {
      body: JSON.stringify(body),
    }
  }),
  'put': (id, body) => ({
    url: `/${id}`,
    init: {
      body: JSON.stringify(body),
    }
  }),
  'patch': (id, body) => ({
    url: `/${id}`,
    init: {
      body: JSON.stringify(body),
    }
  }),
  'delete': (id, body) => ({
    url: `/${id}`,
    init: {
      body: JSON.stringify(body),
    }
  }),
}

const isJSON = response => response.headers.get('content-type').split(';')[0] === 'application/json'

const parseResponseBody = response => isJSON(response) ? response.json() : response.text()

const parseResponse = async response => ({
  status: response.status,
  body: await parseResponseBody(response),
  headers: response.headers,
})
