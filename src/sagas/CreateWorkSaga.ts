import { takeEvery } from 'redux-saga'
import { put } from 'redux-saga/effects'
import { ClaimTypes } from 'poet-js'

import { Actions } from '../actions/index'

function* claimSubmittedSuccess(action: any) {
  const workClaim = action.claims.find((claim: any) => claim.type === ClaimTypes.WORK);

  if (!workClaim)
    return;

  yield put({ type: Actions.Modals.CreateWorkResult.Show });

}

export function createWorkSaga() {
  return function*() {
    yield takeEvery(Actions.Claims.SubmittedSuccess, claimSubmittedSuccess)
  }
}