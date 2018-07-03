import { describe } from 'riteway'

import { delay } from 'redux-saga'
import { takeLatest, call, put } from 'redux-saga/effects'

import { Actions } from '../actions/index'
import { SignInSaga, SignIn, signInFrost } from './SignIn.saga'

describe('SignInSaga()', async (should: any) => {
  const { assert } = should()

  const iterator = SignInSaga()()
  assert({
    given: 'sign in action',
    should: 'handle sign in request',
    actual: iterator.next().value,
    expected: takeLatest(Actions.SignIn.SIGN_IN, SignIn),
  })
})

describe('SignIn() Success', async (should: any) => {
  const { assert } = should()
  const token = 'test'
  const email = 'test@email.com'
  const password = 'test'
  const iterator = SignIn(Actions.SignIn.onSignIn({ email, password }))

  assert({
    given: 'sign in action',
    should: 'set loading status ',
    actual: iterator.next().value,
    expected: put(Actions.LoadingPage.onLoadingOn()),
  })

  assert({
    given: 'next step',
    should: 'fetch user from database',
    actual: iterator.next().value,
    expected: call(signInFrost, { email, password }),
  })

  assert({
    given: 'next step and successful sign in',
    should: 'Set user profile',
    actual: iterator.next({ token }).value,
    expected: put(Actions.SignIn.onSignInSuccess({ token, ...{ profile: { email } } })),
  })

  assert({
    given: 'next step',
    should: 'Set user profile',
    actual: iterator.next().value,
    expected: put(Actions.Profile.onProfile({ token })),
  })

  assert({
    given: 'next step',
    should: 'set loading complete',
    actual: iterator.next().value,
    expected: put(Actions.LoadingPage.onLoadingFull()),
  })

  assert({
    given: 'next step',
    should: 'delay 300',
    actual: iterator.next().value,
    expected: call(delay, 300),
  })
})

describe('SignIn() Error', async (should: any) => {
  const { assert } = should()
  const email = 'test@email.com'
  const password = 'test'
  const iterator = SignIn(Actions.SignIn.onSignIn({ email, password }))

  assert({
    given: 'sign in action',
    should: 'set loading status ',
    actual: iterator.next().value,
    expected: put(Actions.LoadingPage.onLoadingOn()),
  })

  assert({
    given: 'next step',
    should: 'fetch user from database',
    actual: iterator.next().value,
    expected: call(signInFrost, { email, password }),
  })

  assert({
    given: 'next step and invalid user',
    should: 'Set Loading Page To Done',
    actual: iterator.next().value,
    expected: put(Actions.LoadingPage.onLoadingFull()),
  })

  iterator.next()

  assert({
    given: 'next step',
    should: 'delay',
    actual: iterator.next().value,
    expected: call(delay, 300),
  })

  assert({
    given: 'next step',
    should: 'Clear error',
    actual: iterator.next().value,
    expected: put(Actions.SignIn.onSignInClearError()),
  })

  iterator.next()

  assert({
    given: 'next step',
    should: 'be done',
    actual: iterator.next(),
    expected: { value: undefined, done: true },
  })
})
