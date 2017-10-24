import { Action } from 'redux';
import { takeEvery } from 'redux-saga'
import { put, select, take, call, race } from 'redux-saga/effects'
import { WorkOffering, Work } from 'poet-js';

import { Configuration } from '../configuration';
import { Actions } from '../actions'
import { currentPublicKey } from '../selectors/session'

const submitLicense = createHelperFunc('/licenses')
const buyThroughOffering = createHelperFunc('/titles')

export function purchaseLicenseSaga() {
  return function*() {
    yield takeEvery(Actions.Licenses.PurchaseRequested, purchaseLicense)
  }
}

function* purchaseLicense(action: Action & { work: Work, offering: WorkOffering }) {
  const offeringAttributes = action.offering.attributes;
  const reference = offeringAttributes.reference;

  yield put({ type: Actions.Modals.PurchaseLicense.Show, work: action.work, offering: action.offering });

  const { purchaseLicenseModalAccept, purchaseLicenseModalCancel } = yield race({
    purchaseLicenseModalAccept: take(Actions.Modals.PurchaseLicense.Accept),
    purchaseLicenseModalCancel: take(Actions.Modals.PurchaseLicense.Cancel)
  });

  if (!purchaseLicenseModalAccept)
    return;

  yield put({ type: Actions.Modals.PurchaseLicense.Hide});

  yield put({
    type: Actions.Transactions.SignSubmitRequested,
    payload: {
      paymentAddress: offeringAttributes.paymentAddress,
      amountInSatoshis: parseFloat(offeringAttributes.pricingPriceAmount) * (offeringAttributes.pricingPriceCurrency === "BTC" ? 1e8 : 1),
      conceptOf: 'License',
      resultAction: Actions.Licenses.Paid,
      resultPayload: action.offering
    }
  });

  while (true) {
    const result = yield take(Actions.Licenses.Paid);

    if (result.payload.id !== action.offering.id)
      continue;

    const { transaction, outputIndex, normalizedId } = result;
    const publicKey = yield select(currentPublicKey);
    const workOwner = action.work.title.attributes.owner;

    const targetFunction = action.offering.attributes.licenseType === 'for-sale' ? buyThroughOffering : submitLicense;
    const createdClaims = yield call(targetFunction, reference, normalizedId, transaction, outputIndex, workOwner, publicKey, action.offering.id);

    yield put({ type: Actions.Modals.SignTransaction.Hide });
    yield put({ type: Actions.Licenses.Success, resultId: createdClaims[0].id });
    yield put({ type: Actions.Modals.PurchaseLicense.ShowSuccess })

    return;
  }
}

function createHelperFunc(url: string) {
  return async function (reference: string, ntxId: string, txId: string, outputIndex: number, workOwner: string, publicKey: string, referenceOffering: string) {
    return await fetch(Configuration.api.user + url, {
      method: 'POST',
      body: JSON.stringify({
        ntxId,
        txId,
        outputIndex: '' + outputIndex,
        referenceOwner: workOwner,
        owner: publicKey,
        reference,
        referenceOffering
      })
    }).then((res: any) => res.text())
  }
}

