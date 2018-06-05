import { takeEvery } from 'redux-saga'
import { put } from 'redux-saga/effects'

import { Actions } from '../actions/index'
import { Configuration } from '../configuration'
import { FetchType } from '../reducers/FetchReducer'

export function CacheInvalidationSaga() {
  return function*() {
    yield takeEvery(Actions.Transfer.Success, invalidateWorks)
  }
}

function* invalidateWorks() {
  const shortUrl = '/works'
  const url = process.env.POET_URL || Configuration.apiUrl + shortUrl
  yield put({ type: `clear ${shortUrl}`, fetchType: FetchType.CLEAR, url })
}
