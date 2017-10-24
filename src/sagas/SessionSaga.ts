import { browserHistory } from 'react-router'
import { takeEvery } from 'redux-saga'
import { call, put, take } from 'redux-saga/effects'

import { Configuration } from '../configuration';
import { Actions } from '../actions/index'
import { Authentication } from '../authentication'
import { getMockPrivateKey } from '../helpers/mockKey'

const LOCALSTORAGE_SESSION = 'session';

export function sessionSaga() {
  return function*() {
    const session = localStorage.getItem(LOCALSTORAGE_SESSION);

    if (session) {
      const token = JSON.parse(session);
      yield put({ type: Actions.Session.LoginSuccess, token });
      yield put({ type: Actions.Profile.FetchProfile, profilePublicKey: token.publicKey });
    }

    yield takeEvery(Actions.Session.LoginButtonClicked, loginButtonClicked);
    yield takeEvery(Actions.Session.LogoutButtonClicked, logoutButtonClicked);
    yield takeEvery(Actions.Session.LoginResponse, loginResponse);
    yield takeEvery(Actions.Session.MockLoginRequest, mockLoginRequest);
  }
}

function* loginButtonClicked() {
  const loginRequestId = yield call(Authentication.getRequestIdForLogin);
  yield put({ type: Actions.Session.LoginIdReceived, payload: loginRequestId });
  const response = yield call(getPublicKey, loginRequestId);
  yield put({ type: Actions.Session.LoginResponse, payload: response })
}

function* logoutButtonClicked() {
  yield put({ type: Actions.Session.LogoutRequested });
  localStorage.removeItem(LOCALSTORAGE_SESSION);
  browserHistory.push('/');
}

function* loginResponse(action: any) {
  localStorage.setItem(LOCALSTORAGE_SESSION, JSON.stringify(action.payload));
  yield put({ type: Actions.Session.LoginSuccess, token: action.payload });

  yield put({ type: Actions.Profile.FetchProfile, profilePublicKey: action.payload.publicKey });

  const profileFetched = yield take(Actions.Profile.ProfileFetched);

  if (profileFetched.profile && profileFetched.profile.displayName)
    browserHistory.push('/');
  else
    browserHistory.push('/account/profile');
}

function* mockLoginRequest(action: any) {
  yield call(fetch, Configuration.api.mockApp + '/' + getMockPrivateKey() + '/' + action.payload, { method: 'POST' })
}

async function getPublicKey(request: any) {
  const data = (await Authentication.onResponse(request.id) as any).signatures[0];
  return {
    publicKey: data.publicKey,
    token: { ...data, message: data.message }
  }
}