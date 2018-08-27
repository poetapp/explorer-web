import { takeEvery, call, select } from "redux-saga/effects";
import { describe } from 'riteway'

import { Actions } from '../actions'
import { fetchSaga, fetchData, dispatchFetchStatusUpdate, getLatestTwoNamesOnResource, apiFetch, TEXT, NOT_FOUND } from './FetchSaga'
import { FetchType } from '../reducers/FetchReducer'
import { getResourceState } from '../selectors/fetch'

describe('FetchSaga()', async (should: any) => {
  const { assert } = should()

  const iterator = fetchSaga()();

  assert({
    given: 'fetchRequest Action',
    should: 'handle fetch request',
    actual: iterator.next().value,
    expected: takeEvery(Actions.fetchRequest, fetchData),
  })
})

describe('fetchData() Not Found Error', async (should: any) => {
  const { assert } = should()
  const urlObj = { url: 'test' }
  const { url } = urlObj
  const short = getLatestTwoNamesOnResource(url)
  const result: ReadonlyArray<string> = []
  const error = NOT_FOUND
  const headers = {} as Headers
  const iterator = fetchData({ type: Actions.fetchRequest, payload: urlObj })
  
  assert({
    given: 'fetchRequest Action',
    should: 'get current state',
    actual: iterator.next().value,
    expected: select(getResourceState, url),
  })

  assert({
    given: 'next step',
    should: 'dispatchStatusUpdate',
    actual: iterator.next().value,
    expected: dispatchFetchStatusUpdate(
      FetchType.MARK_LOADING,
      'mark loading ' + short,
      url
    )
  })

  assert({
    given: 'next step',
    should: 'fetch from url',
    actual: iterator.next().value,
    expected: call(apiFetch, url)
  })

  assert({
    given: 'next step with notFound error',
    should: 'dispatch status update with NOT_FOUND',
    actual: iterator.next({ headers, result, error }).value,
    expected: dispatchFetchStatusUpdate(FetchType.NOT_FOUND, TEXT[FetchType.NOT_FOUND] + short, url, error || result, headers)
  })
})

describe('fetchData() Other Error', async (should: any) => {
  const { assert } = should()
  const urlObj = { url: 'test' }
  const { url } = urlObj
  const short = getLatestTwoNamesOnResource(url)
  const result: ReadonlyArray<string> = []
  const error = 'Test Error'
  const headers = {} as Headers
  const iterator = fetchData({ type: Actions.fetchRequest, payload: urlObj })
  
  assert({
    given: 'fetchRequest Action',
    should: 'get current state',
    actual: iterator.next().value,
    expected: select(getResourceState, url),
  })

  assert({
    given: 'next step',
    should: 'dispatchStatusUpdate',
    actual: iterator.next().value,
    expected: dispatchFetchStatusUpdate(
      FetchType.MARK_LOADING,
      'mark loading ' + short,
      url
    )
  })

  assert({
    given: 'next step',
    should: 'fetch from url',
    actual: iterator.next().value,
    expected: call(apiFetch, url)
  })

  assert({
    given: 'next step with other error',
    should: 'dispatch status update with error',
    actual: iterator.next({ headers, result, error }).value,
    expected: dispatchFetchStatusUpdate(FetchType.ERROR, TEXT[FetchType.ERROR] + short, url, error || result, headers)
  })
})

describe('fetchData() No Error', async (should: any) => {
  const { assert } = should()
  const urlObj = { url: 'test' }
  const { url } = urlObj
  const short = getLatestTwoNamesOnResource(url)
  const result: ReadonlyArray<string> = []
  const error: any = undefined
  const headers = {} as Headers
  const iterator = fetchData({ type: Actions.fetchRequest, payload: urlObj })
  
  assert({
    given: "fetchRequest Action",
    should: "get current state",
    actual: iterator.next().value,
    expected: select(getResourceState, url),
  });

  assert({
    given: 'next step',
    should: 'dispatchStatusUpdate',
    actual: iterator.next().value,
    expected: dispatchFetchStatusUpdate(
      FetchType.MARK_LOADING,
      'mark loading ' + short,
      url
    )
  })

  assert({
    given: 'next step',
    should: 'fetch from url',
    actual: iterator.next().value,
    expected: call(apiFetch, url)
  })

  assert({
    given: 'next step with other result',
    should: 'dispatch status update with result',
    actual: iterator.next({ headers, result, error }).value,
    expected: dispatchFetchStatusUpdate(FetchType.SET_RESULT, TEXT[FetchType.SET_RESULT] + short, url, error || result, headers)
  })
})
