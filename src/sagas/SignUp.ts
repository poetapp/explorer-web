import { browserHistory } from 'react-router'
import { delay, SagaIterator } from 'redux-saga'
import { call, takeLatest, put, ForkEffect } from 'redux-saga/effects'
import { FrostClient } from 'singletons/FrostClient'

import { Actions } from 'actions/index'

export async function signUpFrost(data: {
  readonly email: string
  readonly password: string,
}): Promise<{ readonly token: string }> {
  const { email, password } = data
  return await FrostClient.create(email, password)
}

export function SignUpSaga(): () => IterableIterator<ForkEffect> {
  return function*(): IterableIterator<ForkEffect> {
    yield takeLatest(Actions.SignUp.SIGN_UP, SignUp)
  }
}

export function* SignUp(action: any): SagaIterator {
  try {
    const { email, password } = action.payload
    yield put(Actions.LoadingPage.onLoadingOn())
    const { token } = yield call(signUpFrost, { email, password })
    yield put(Actions.SignUp.onSignUpSuccess({ token, ...{ profile: { email } } }))
    yield put(Actions.Profile.onProfile({ token }))
    yield put(Actions.LoadingPage.onLoadingFull())
    yield call(delay, 300)
    browserHistory.push('/dashboard')
  } catch (e) {
    yield put(Actions.LoadingPage.onLoadingFull())
    yield put(Actions.SignUp.onSignUpError(e))
    yield call(delay, 300)
    yield put(Actions.SignUp.onSignUpClearError())
  }
}
