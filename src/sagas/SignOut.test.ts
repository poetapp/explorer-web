import { Frost } from '@poetapp/frost-client'
import { delay } from 'redux-saga'
import { takeLatest, call, put } from 'redux-saga/effects'
import { describe } from 'riteway'

import { Actions } from '../actions/index'
import { SignOutSaga, SignOut } from './SignOut'

describe('SignOutSaga()', async (should: any) => {
  const { assert } = should()

  const iterator = SignOutSaga()()
  assert({
    given: 'sign in action',
    should: 'handle sign in request',
    actual: iterator.next().value,
    expected: takeLatest(Actions.SignOut.SIGN_OUT, SignOut),
  })
})
