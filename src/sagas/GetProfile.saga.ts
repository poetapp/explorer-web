import { Frost } from '@poetapp/frost-client'
import { Actions } from 'actions/index'
import { SagaIterator } from 'redux-saga'
import { call, takeLatest, put, ForkEffect } from 'redux-saga/effects'

async function GetProfileFrost(
  token: string,
  password: string
): Promise<{ readonly createdAt: number; readonly verified: boolean }> {
  const frost = new Frost({ host: '/api' })
  return await frost.getProfile(token)
}

export function GetProfileSaga(): () => IterableIterator<ReadonlyArray<ForkEffect>> {
  return function*(): IterableIterator<ReadonlyArray<ForkEffect>> {
    yield [
      takeLatest(Actions.Profile.PROFILE, GetProfile),
      takeLatest(Actions.SetTokenLogin.SET_TOKEN_LOGIN, GetProfile),
    ]
  }
}

function* GetProfile(action: any): SagaIterator {
  try {
    const { token } = action.payload
    const profile = yield call(GetProfileFrost, token)
    yield put(Actions.Profile.onProfileSuccess(profile))
  } catch (e) {
    yield put(Actions.Profile.onProfileError(e))
  }
}
