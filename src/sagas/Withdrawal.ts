import { Action } from 'redux'
import { takeEvery } from 'redux-saga'
import { put, take } from 'redux-saga/effects'

import { Actions } from '../actions/index'

interface WithdrawalRequestedAction extends Action {
  readonly payload: {
    readonly paymentAddress: string;
    readonly amountInSatoshis: number;
    readonly conceptOf: string;
  }
}

export function withdrawal() {
  return function*() {
    yield takeEvery(Actions.Withdrawal.Requested, withdrawalRequested)
  }
}

function* withdrawalRequested(action: WithdrawalRequestedAction) {
  const paymentAddress = action.payload.paymentAddress;
  const amountInSatoshis = action.payload.amountInSatoshis;

  yield put({
    type: Actions.Transactions.SignSubmitRequested,
    payload: {
      paymentAddress,
      amountInSatoshis,
      conceptOf: action.payload.conceptOf,
      resultAction: Actions.Withdrawal.Done,
      resultPayload: {}
    }
  });

  yield take(Actions.Withdrawal.Done);
  yield put({ type: Actions.Modals.SignTransaction.Hide })
}
