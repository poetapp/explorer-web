import { fromPairs, keys, map, pipe } from 'ramda'

interface Configuration {
  readonly apiUrl: string
  readonly dateFormat: string
  readonly dateTimeFormat: string
  readonly frostApiUrl: string
  readonly pagination: Pagination
  readonly linkBtcBlockHeight: string
  readonly linkBtcBlockHash: string
  readonly linkBtcTx: string
  readonly linkIpfs: string
}

interface Pagination {
  readonly limit: number
  readonly visiblePageCount: number
}

export const defaultConfiguration: Configuration = {
  frostApiUrl: 'http://localhost:3000',
  apiUrl: 'http://localhost:18080',
  linkBtcBlockHeight: 'http://localhost:8332/',
  linkBtcBlockHash: 'http://localhost:8332/',
  linkBtcTx: 'http://localhost:8332/',
  linkIpfs: 'http://localhost:8080/',
  dateFormat: 'MMMM Do YYYY',
  dateTimeFormat: 'MMMM Do YYYY, HH:mm:ss',
  pagination: {
    limit: 10,
    visiblePageCount: 6,
  },
}

export const camelCaseToScreamingSnakeCase = (camelCase: string = '') =>
  camelCase.replace(/([A-Z])/g, capital => '_' + capital).toUpperCase()

const toPair = (s: string) => [camelCaseToScreamingSnakeCase(s), s]

const extractValue = (value: any) => {
  const coercedValue = value === 'true' ? true : value === 'false' ? false : value

  return isNaN(coercedValue)
    ? coercedValue
    : typeof coercedValue === 'boolean'
      ? coercedValue
      : parseInt(coercedValue, 10)
}

export const createEnvToConfigurationKeyMap: (keys: ReadonlyArray<string>) => {
  readonly [index: string]: string,
} = pipe(
  map(toPair),
  fromPairs,
)

const loadConfigurationFromEnv = (env: any): Partial<Configuration> => {
  const map = createEnvToConfigurationKeyMap(keys(defaultConfiguration))

  const configurationFromEnv = Object.entries(env)
    .filter(([key, value]) => map[key])
    .filter(([key, value]) => value !== undefined)
    .reduce(
      (previousValue, [key, value]: [string, any]) => ({
        ...previousValue,
        [map[key]]: extractValue(value),
      }),
      {},
    )
  return configurationFromEnv
}

export const getConfigurationWithDefaults = (envVars: any = {}) => ({
  ...defaultConfiguration,
  ...loadConfigurationFromEnv(envVars),
})

export const Configuration = getConfigurationWithDefaults(process.env)
