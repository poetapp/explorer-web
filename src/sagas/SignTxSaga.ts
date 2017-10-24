import { Action } from 'redux'
import { takeEvery } from 'redux-saga';
import { call, put, select, take, race } from 'redux-saga/effects';
import * as bitcore from 'bitcore-lib';

import { Configuration } from '../configuration';
import { InsightClient } from '../Insight'
import { Actions } from '../actions/index';
import { Authentication } from '../authentication'
import { getMockPrivateKey } from '../helpers/mockKey';
import { getSighash, applyHexSignaturesInOrder } from '../helpers/TransactionHelper';
import { currentPublicKey } from '../selectors/session';

export interface SignSubmitRequestedAction extends Action {
  readonly payload: {
    readonly paymentAddress: string
    readonly amountInSatoshis: number
    readonly conceptOf: string
    readonly resultAction: string
    readonly resultPayload: any
  }
}

export function hintNormalized(txid: string, ntxid: string) {
  return fetch(Configuration.api.explorer + '/normalized/hint', {
    method: 'POST',
    body: JSON.stringify({ txId: txid, ntxId: ntxid })
  }).catch((error: any) => {
    console.log(error)
  })
}

export function signTransaction() {
  return function*() {
    yield takeEvery(Actions.Transactions.SignSubmitRequested, signTxCancellable);
    yield takeEvery(Actions.Transactions.FakeSign, mockLoginHit);
  }
}

function* signTxCancellable(action: SignSubmitRequestedAction) {
  yield race({
    signTx: call(signTx, action),
    hideModal: call(function*() {
      yield take(Actions.Modals.SignTransaction.Hide);
    })
  })
}

function* signTx(action: SignSubmitRequestedAction) {
  yield put({ type: Actions.Modals.SignTransaction.Show, payload: action.payload });

  const publicKey = bitcore.PublicKey(yield select(currentPublicKey));

  const myAddress = bitcore.Address(publicKey, bitcore.Networks.testnet);
  const myAddressString = myAddress.toString();
  const utxos = yield call(InsightClient.Address.Utxos.get, myAddress);

  const targetAddress = action.payload.paymentAddress;
  const amount = parseInt('' + action.payload.amountInSatoshis, 10);

  const tx = new bitcore.Transaction().from(utxos)
    .to(targetAddress, amount)
    .change(myAddressString);
  const sighash = getSighash(tx, myAddress);

  const requestId = yield call(requestIdFromAuth, sighash, true, publicKey);
  yield put({ type: Actions.Transactions.SignIdReceived, payload: requestId.id });
  const response = yield call(bindAuthResponse, requestId);
  yield put({ type: Actions.Transactions.Submitting });

  applyHexSignaturesInOrder(tx, response.signatures, publicKey);
  const txId = yield call(InsightClient.Transactions.send.post, tx.toString());
  yield call(hintNormalized, tx.id, tx.nid);

  yield put({
    type: action.payload.resultAction,
    payload: action.payload.resultPayload,
    transaction: txId,
    normalizedId: tx.nid,
    outputIndex: 0 // TODO: Sort inputs according to BIP69 and change this.
  });

  yield put({ type: Actions.Transactions.SubmittedSuccess });
}

async function requestIdFromAuth(dataToSign: Buffer[], bitcoin: boolean, notifyPubkey?: string) {
  return await Authentication.getRequestIdForMultipleSigningBuffers(dataToSign, bitcoin, notifyPubkey)
}

async function bindAuthResponse(request: any) {
  return await Authentication.onResponse(request.id) as any;
}

function* mockLoginHit(action: any) {
  yield call(fetch, Configuration.api.mockApp + '/' + getMockPrivateKey() + '/' + action.payload, { method: 'POST' })
}

