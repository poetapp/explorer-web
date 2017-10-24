import { browserHistory } from 'react-router'
import { takeEvery } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import { Claim, ClaimBuilder } from 'poet-js';

import { Configuration } from '../configuration';
import { Actions } from '../actions/index'
import { Authentication } from '../authentication'
import { currentPublicKey } from '../selectors/session'
import { getMockPrivateKey } from '../helpers/mockKey'

export interface SubmitRequestedAction {
  readonly publicKey: string;
  readonly payload: ReadonlyArray<Claim>;
  readonly noModal: boolean;
}

export function submitClaims() {
  return function*() {
    yield takeEvery(Actions.Claims.SubmitRequested, submitRequested);
    yield takeEvery(Actions.Claims.FakeSign, fakeSign);
  }
}

function* submitRequested(action: SubmitRequestedAction) {
  if (!action.noModal)
    yield put({ type: Actions.Modals.SignClaims.Show });

  const publicKey = (yield select(currentPublicKey)) || action.publicKey;

  if (!publicKey)
    throw new Error('Claim Sign Saga: cannot sign a claim without a public key.');

  // TODO: should claims already come with their publicKey set?
  for (const claim of action.payload)
    claim.publicKey = publicKey

  const serializedToSign = action.payload.map(ClaimBuilder.getEncodedForSigning);

  const requestId = yield call(requestIdFromAuth, serializedToSign, publicKey);
  yield put({ type: Actions.Claims.IdReceived, payload: requestId.id });

  const response = yield call(getAuthResponse, requestId);
  yield put({ type: Actions.Claims.Response, payload: response });

  const postClaimsResult = yield call(postClaims, response);

  yield put({ type: Actions.Claims.SubmittedSuccess, claims: action.payload });

  if (!action.noModal)
    yield put({ type: Actions.Modals.SignClaims.Hide });

  const createdWorkClaim = postClaimsResult.createdClaims.find((claim: Claim) => claim.type === 'Work');
  const updatedProfile = postClaimsResult.createdClaims.find((claim: Claim) => claim.type === 'Profile');

  if (createdWorkClaim) {
    const submittedWorkClaim = action.payload.find(_ => _.type === 'Work') as any
    const supersedes = submittedWorkClaim && submittedWorkClaim.attributes.find((_: any) => _.key === 'supersedes')
    browserHistory.push(`/works/` + (supersedes ? supersedes.value : createdWorkClaim.id));
  } else if (updatedProfile) {
    browserHistory.push(`/profiles/` + publicKey);
  } else {
    browserHistory.push(`/portfolio/`);
  }

}

function* fakeSign(action: any) {
  yield call(fetch, Configuration.api.mockApp + '/' + getMockPrivateKey() + '/' + action.payload, { method: 'POST' })
}

async function requestIdFromAuth(dataToSign: string[], notifyPubkey: string) {
  return await Authentication.getRequestIdForMultipleSigning(dataToSign, false, notifyPubkey)
}

async function getAuthResponse(request: any) {
  return await Authentication.onResponse(request.id) as any;
}

async function postClaims(data: any) {
  return await fetch(Configuration.api.user + '/claims', {
    method: 'POST',
    body: JSON.stringify(data)
  }).then(res => res.json())
}
