import { ApiClient } from 'helpers/ApiClient'
import { assertEnvironment } from 'helpers/api'

const environmentToUrl = (environment, network) => {
  assertEnvironment(environment)

  const environmentPrefix = environment === 'production' ? '' : environment + '.'

  const nodeUrl = `https://${network}.${environmentPrefix}poetnetwork.net`

  return nodeUrl
}

export const PoetNodeApi = ({ environment, network }) => ApiClient({
  url: environmentToUrl(environment, network),
  resources,
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
