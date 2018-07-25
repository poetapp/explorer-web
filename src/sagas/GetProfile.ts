import { Actions } from 'actions/index'
import { SagaIterator } from 'redux-saga'
import { call, takeLatest, put, ForkEffect } from 'redux-saga/effects'

import { FrostClient } from 'singletons/FrostClient'

export function GetProfileSaga(): () => IterableIterator<ReadonlyArray<ForkEffect>> {
  return function*(): IterableIterator<ReadonlyArray<ForkEffect>> {
    yield [
      takeLatest(Actions.Profile.PROFILE, GetProfile),
      takeLatest(Actions.SetTokenLogin.SET_TOKEN_LOGIN, GetProfile),
    ]
  }
}

export function* GetProfile(action: any): SagaIterator {
  try {
    const { token } = action.payload
    const profile = yield call(FrostClient.getProfile, token)
    yield put(Actions.Profile.onProfileSuccess(profile))
  } catch (e) {
    yield put(Actions.Profile.onProfileError(e))
  }
}
