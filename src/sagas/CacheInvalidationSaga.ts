import { takeEvery } from 'redux-saga'
import { put, select } from 'redux-saga/effects'

import { Configuration } from '../configuration';
import { Actions } from '../actions/index'
import { FetchType } from '../reducers/FetchReducer';

export function CacheInvalidationSaga() {
  return function*() {
    yield takeEvery(Actions.Transfer.Success, invalidateWorks);
  }
}

function* invalidateWorks() {
  const shortUrl = '/works';
  const url = Configuration.apiUrl + shortUrl;
  yield put({ type: `clear ${shortUrl}`, fetchType: FetchType.CLEAR, url });
}

function* invalidateWork(id: string) {
  const shortUrl = `/works/${id}`;
  const url = Configuration.apiUrl + shortUrl;
  yield put({ type: `clear ${shortUrl}`, fetchType: FetchType.CLEAR, url });
}