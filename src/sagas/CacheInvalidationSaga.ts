import { takeEvery } from 'redux-saga'
import { put, select } from 'redux-saga/effects'

import { InsightClient } from 'Insight'
import { Configuration } from '../configuration';
import { Actions } from '../actions/index'
import { FetchType } from '../reducers/FetchReducer';
import { currentPublicKey } from '../selectors/session';
import { publicKeyToAddress } from '../helpers/AddressHelper';

export function CacheInvalidationSaga() {
  return function*() {
    yield takeEvery(Actions.Claims.SubmittedSuccess, claimsSubmittedSuccess);
    yield takeEvery(Actions.Transactions.SubmittedSuccess, invalidateBalance);
    yield takeEvery(Actions.Licenses.Success, invalidateLicenses);
    yield takeEvery(Actions.Transfer.Success, invalidateWorks);
  }
}

function* claimsSubmittedSuccess(claimSubmittedAction: any) {
  for (let claim of claimSubmittedAction.claims) {
    if (claim.type === 'Work') {
      yield invalidateWorks();
      const supersedes = claim.attributes.find((_: any) => _.key === 'supersedes');
      if (supersedes)
        yield invalidateWork(supersedes.value)
    }
    if (claim.type === 'Profile') {
      const publicKey = yield select(currentPublicKey);
      yield put({ type: Actions.Profile.FetchProfile, profilePublicKey: publicKey });
    }
  }
}

function* invalidateBalance() {
  const address = publicKeyToAddress(yield select(currentPublicKey));
  yield put({
    type: 'clear balance',
    fetchType: FetchType.CLEAR,
    url: InsightClient.Address.Utxos.url(address)
  });
  yield put({
    type: 'clear tx history',
    fetchType: FetchType.CLEAR,
    url: InsightClient.Transactions.byBlockOrAddress.path
  });
}

function* invalidateLicenses() {
  const shortUrl = '/licenses';
  const url = Configuration.api.explorer + shortUrl;
  yield put({ type: `clear ${shortUrl}`, fetchType: FetchType.CLEAR, url });
}

function* invalidateWorks() {
  const shortUrl = '/works';
  const url = Configuration.api.explorer + shortUrl;
  yield put({ type: `clear ${shortUrl}`, fetchType: FetchType.CLEAR, url });
}

function* invalidateWork(id: string) {
  const shortUrl = `/works/${id}`;
  const url = Configuration.api.explorer + shortUrl;
  yield put({ type: `clear ${shortUrl}`, fetchType: FetchType.CLEAR, url });
}