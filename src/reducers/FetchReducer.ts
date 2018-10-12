import { FetchStatus } from '../enums/FetchStatus'
import { FetchStore, FetchStoreEntry } from '../store/PoetAppState'

export class FetchType {
  static readonly MARK_LOADING = 'mark loading'
  static readonly SET_RESULT = 'set result'
  static readonly ERROR = 'error for'
  static readonly CLEAR = 'clear for'
  static readonly NOT_FOUND = 'not found'

  static readonly Types: ReadonlyArray<string> = [
    FetchType.CLEAR,
    FetchType.MARK_LOADING,
    FetchType.SET_RESULT,
    FetchType.ERROR,
    FetchType.NOT_FOUND,
  ]
}

export function fetchReducer(store: FetchStore, action: any): FetchStore {
  if (action.type === 'persist/REHYDRATE') return mapReydrate(action.payload.fetch)
  if (!actionIsFetchAction(action)) return store || {}

  const newFetchStoreEntry = actionToFetchStoreEntry(action)

  if (action.fetchType === FetchType.CLEAR) return clearCache(store, action.url, newFetchStoreEntry)

  return { ...store, [action.url]: newFetchStoreEntry }
}

function actionIsFetchAction(action: any): action is FetchAction {
  return action.fetchType && FetchType.Types.includes(action.fetchType)
}

const mapReydrate = (data = {}) => {
  if (data === null) return {}

  return Object.entries(data).reduce((acum, currentData) => {
    const values = { ...currentData[1], status: 0 }
    const key = currentData[0]
    return { ...acum, [key]: values }
  }, {})
}

export interface FetchAction {
  readonly type: string
  readonly fetchType: FetchType
  readonly url: string
  readonly body?: any
  readonly headers?: Headers
}

function actionToFetchStoreEntry(action: FetchAction): FetchStoreEntry<any> {
  switch (action.fetchType) {
    case FetchType.CLEAR:
      return { status: FetchStatus.Uninitialized, body: null }
    case FetchType.MARK_LOADING:
      return { status: FetchStatus.Loading }
    case FetchType.SET_RESULT:
      return {
        status: FetchStatus.Loaded,
        body: action.body,
        headers: action.headers,
      }
    case FetchType.NOT_FOUND:
      return { status: FetchStatus.NotFound, error: action.body }
    case FetchType.ERROR:
      return { status: FetchStatus.Error, error: action.body }
    default:
      throw new Error(`FetchReducer: Invalid FetchType '${action.fetchType}'.`)
  }
}

/**
 * Clears cache for all entries that without the query params match the baseUrl
 */
function clearCache(store: FetchStore, baseUrl: string, newValue: FetchStoreEntry<any>) {
  const matchingUrls = getMatchingUrls(store, baseUrl)
  const newFetchStoreEntries: FetchStore = {}

  for (const matchingUrl of matchingUrls) newFetchStoreEntries[matchingUrl] = newValue

  return { ...store, ...newFetchStoreEntries }
}

function getMatchingUrls(store: FetchStore, baseUrl: string) {
  return Object.keys(store).filter(url => url.split('?')[0] === baseUrl)
}
