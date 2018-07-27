import { Frost } from '@poetapp/frost-client'
import { takeLatest, call, put } from 'redux-saga/effects'
import { describe } from 'riteway'

import { Actions } from '../actions/index'
import { GetProfileSaga, GetProfile } from './GetProfile'

describe('SignInSaga()', async (should: any) => {
  const { assert } = should()

  const iterator = GetProfileSaga()()
  assert({
    given: 'sign in action',
    should: 'handle sign in request',
    actual: iterator.next().value,
    expected: [
      takeLatest(Actions.Profile.PROFILE, GetProfile),
      takeLatest(Actions.SetTokenLogin.SET_TOKEN_LOGIN, GetProfile),
    ],
  })
})

describe('GetProfile() Success', async (should: any) => {
  const { assert } = should()
  const token = 'test'
  const profile = {
    createAt: 1,
    verified: true,
  }
  const iterator = GetProfile(Actions.Profile.onProfile({ token }))

  const frost = new Frost({ host: '/api' })

  assert({
    given: 'Profile Action with token',
    should: 'Get profile from frost-client',
    actual: iterator.next().value,
    expected: call([frost, frost.getProfile], token),
  })

  assert({
    given: 'next step and valid profile',
    should: 'Set user profile',
    actual: iterator.next(profile).value,
    expected: put(Actions.Profile.onProfileSuccess(profile)),
  })

  assert({
    given: 'next step',
    should: 'be done',
    actual: iterator.next(),
    expected: { value: undefined, done: true },
  })
})

describe('GetProfile() Error', async (should: any) => {
  const { assert } = should()
  const token = 'tesdft'
  const iterator = GetProfile(Actions.Profile.onProfile({ token }))

  const frost = new Frost({ host: '/api' })

  assert({
    given: 'Profile Action with token',
    should: 'Get profile from frost-client',
    actual: iterator.next().value,
    expected: call([frost, frost.getProfile], token),
  })
})
