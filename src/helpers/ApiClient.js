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

  const bleh = (resource, method, options) => ({
    method,
    headers: { ...headers, ...resource.headers, ...options.headers },
  })

  const makeUrl = (resourceName, resource) => ({ url: asd = '', init }) => ({
    url: url + (resource.url || '/' + resourceName) + asd,
    init,
  })

  const resourceOperationToFetch = (resourceName, resource) => (method, options) => asyncPipe(
    operationToFetchArguments(bleh(resource, method, options)),
    makeUrl(resourceName, resource),
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

const operationToFetchArguments = ({ url, method, headers }) => {
  switch (method) {
    case 'get':
      return id => ({
        url: `/${id}`,
        init: {
          method,
          headers,
        },
      })
    case 'find':
      return searchParams => ({
        url: `?${filtersToQueryParams(searchParams)}`,
        init: {
          method: 'get',
          headers,
        },
      })
    case 'post':
      return body => ({
        init: {
          method,
          headers,
          body: JSON.stringify(body),
        }
      })
    case 'put':
      return (id, body) => ({
        url: `/${id}`,
        init: {
          method,
          headers,
          body: JSON.stringify(body),
        }
      })
    case 'patch':
      return (id, body) => ({
        url: `/${id}`,
        init: {
          method,
          headers,
          body: JSON.stringify(body),
        }
      })
    case 'delete':
      return (id, body) => ({
        url: `/${id}`,
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
