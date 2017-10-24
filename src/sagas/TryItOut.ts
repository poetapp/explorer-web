import { Action } from 'redux';
import { takeEvery } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';

import { Actions } from '../actions';
import { Authentication } from '../authentication';

export interface TryItOutSubmitAction extends Action {
  readonly workClaim: any;
}

export function tryItOut() {
  return function*() {
    yield takeEvery(Actions.Modals.TryItOut.Submit, tryItOutSubmitted);
  }
}

function* tryItOutSubmitted(action: TryItOutSubmitAction) {
  const loginRequestId = yield call(Authentication.getRequestIdForLogin);
  yield put({type: Actions.Session.MockLoginRequest, payload: loginRequestId.id});

  const publicKey = yield call(getPublicKey, loginRequestId.id);

  yield put({type: Actions.Claims.SubmitRequested, payload: action.workClaim, publicKey, noModal: true});

  const claimId = yield take(Actions.Claims.IdReceived);

  yield put({type: Actions.Claims.FakeSign, payload: claimId.payload});

  yield take(Actions.Claims.SubmittedSuccess);

  yield put({ type: Actions.Modals.TryItOut.Hide });
}

async function getPublicKey(requestId: string) {
  const authenticationResponse = await Authentication.onResponse(requestId) as any;
  return authenticationResponse.signatures[0].publicKey
}