import { fromPairs, keys, map, pipe } from 'ramda'

interface Configuration {
  readonly apiUrl: string
  readonly btcBlockHash: string
  readonly btcBlockHeight: string
  readonly btcTxnId: string
  readonly dateFormat: string
  readonly dateTimeFormat: string
  readonly frostApiUrl: string
  readonly ipfsGateway: string
  readonly pagination: Pagination
  readonly useMockSigner?: boolean
}

interface Pagination {
  readonly limit: number
  readonly visiblePageCount: number
}

export const defaultConfiguration: Configuration = {
  frostApiUrl: 'http://localhost:3000',
  apiUrl: 'http://localhost:18080',
  dateFormat: 'MMMM Do YYYY',
  dateTimeFormat: 'MMMM Do YYYY, HH:mm:ss',
  pagination: {
    limit: 10,
    visiblePageCount: 6,
  },
  btcTxnId: '',
  btcBlockHash: '',
  btcBlockHeight: '',
  ipfsGateway: '',
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
