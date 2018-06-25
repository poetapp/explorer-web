import { Frost } from '@poetapp/frost-client'
import { Actions } from 'actions/index'
import { browserHistory } from 'react-router'
import { delay, SagaIterator } from 'redux-saga'
import { call, takeLatest, put, ForkEffect } from 'redux-saga/effects'
const { toast } = require('react-toastify')

async function signInFrost(data: {
  readonly email: string
  readonly password: string
}): Promise<{ readonly token: string }> {
  const { email, password } = data
  const frost = new Frost({ host: '/api' })
  return await frost.login(email, password)
}

export function SignInSaga(): () => IterableIterator<ForkEffect> {
  return function*(): IterableIterator<ForkEffect> {
    yield takeLatest(Actions.SignIn.SIGN_IN, SignIn)
  }
}

function* SignIn(action: any): SagaIterator {
  try {
    const { email, password } = action.payload
    yield put(Actions.LoadingPage.onLoadingOn())
    const { token } = yield call(signInFrost, { email, password })
    yield put(Actions.SignIn.onSignInSuccess({ token, ...{ profile: { email } } }))
    yield put(Actions.Profile.onProfile({ token }))
    yield put(Actions.LoadingPage.onLoadingFull())
    yield call(delay, 300)
    browserHistory.push('/dashboard')
  } catch (e) {
    yield put(Actions.LoadingPage.onLoadingFull())
    yield put(Actions.SignIn.onSignInError(e))
    yield call(delay, 300)
    yield put(Actions.SignIn.onSignInClearError())
    toast.error(e, {
      className: 'toast',
      autoClose: 2500,
    })
  }
}
