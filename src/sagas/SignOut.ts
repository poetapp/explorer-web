import { Actions } from 'actions/index'
import { browserHistory } from 'react-router'
import { takeLatest, ForkEffect } from 'redux-saga/effects'

export function SignOutSaga(): () => IterableIterator<ForkEffect> {
  return function*(): IterableIterator<ForkEffect> {
    yield takeLatest(Actions.SignOut.SIGN_OUT, SignOut)
  }
}

export function SignOut(action: any): void {
  try {
    if (!(action.payload && action.payload.redirectLogin === false)) browserHistory.push('/')
  } catch (e) {
    // Todo: Error message in UI
  }
}
