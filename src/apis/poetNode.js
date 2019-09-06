import { identity } from 'ramda'

import { ApiClient } from 'helpers/ApiClient'
import { assertEnvironment } from 'helpers/api'

const environmentToUrl = (environment, network) => {
  assertEnvironment(environment)

  const environmentPrefix = environment === 'production' ? '' : environment + '.'

  const nodeUrl = environment !== 'local'
    ? `https://${network}.${environmentPrefix}poetnetwork.net`
    : 'http://localhost:18080'

  return nodeUrl
}

export const PoetNodeApi = ({ environment, network, fallbackCatch = identity }) => ApiClient({
  url: environmentToUrl(environment, network),
  resources,
  fallbackCatch,
})

const resources = {
  works: {
    get: true,
    find: true,
  },
  graph: {
    get: true,
  },
}
