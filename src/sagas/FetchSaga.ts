import { takeEvery } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'

import { Actions } from '../actions/index'
import { FetchStatus } from '../enums/FetchStatus'
import { FetchType, FetchAction } from '../reducers/FetchReducer'
import { getResourceState } from '../selectors/fetch'

const NOT_FOUND = 'not found'

export function fetchSaga() {
  return function*() {
    yield takeEvery(Actions.fetchRequest, fetchData)
  }
}

export const TEXT: { [key: string]: string } = {
  [FetchType.NOT_FOUND]: 'not found ',
  [FetchType.ERROR]: 'error for ',
  [FetchType.SET_RESULT]: 'set result ',
}

function* fetchData(action: any) {
  const url = action.payload.url
  const short = getLatestTwoNamesOnResource(url)

  const currentState = yield select(getResourceState(url))
  if (currentState === FetchStatus.Loading) return
  yield dispatchFetchStatusUpdate(FetchType.MARK_LOADING, 'mark loading ' + short, url)

  const { result, error, headers } = yield call(apiFetch, url)
  const dispatchUpdate = (type: string) =>
    dispatchFetchStatusUpdate(type, TEXT[type] + short, url, error || result, headers)

  error
    ? error === NOT_FOUND
      ? yield dispatchUpdate(FetchType.NOT_FOUND)
      : yield dispatchUpdate(FetchType.ERROR)
    : yield dispatchUpdate(FetchType.SET_RESULT)
}

function getLatestTwoNamesOnResource(str: string) {
  const parts = str.split('?')[0].split('/')
  return parts.slice(parts.length - 2).join('/')
}

function apiFetch(url: string): Promise<{ result: object; headers: Headers }> {
  return fetch(url)
    .then((result: any) => {
      if (result.status === 404) return { error: NOT_FOUND }
      if (result.status !== 200) return result.body().then((error: any) => ({ error }))

      return result.json().then((json: any) => ({ result: json, headers: result.headers }))
    })
    .catch((error: any) => ({ error }))
}

function dispatchFetchStatusUpdate(fetchType: FetchType, type: string, url: string, body?: any, headers?: Headers) {
  const fetchAction: FetchAction = { fetchType, type, url, body, headers }
  return put(fetchAction)
}
