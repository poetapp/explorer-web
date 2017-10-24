
import { Actions } from '../actions/index';

export function claimSignReducer(state: any, action: any) {
  switch (action.type) {
    case Actions.Claims.SubmitRequested:
      return { ...state, claims: action.payload };
    case Actions.Claims.IdReceived:
      return { ...state, id: action.payload, submitting: false };
    case Actions.Claims.Response:
      return { ...state, submitting: true };
    case Actions.Claims.SubmittedSuccess:
      return { ...state, success: true };
    case Actions.Modals.SignClaims.Hide:
      return { ...state, success: null, id: null };
  }
  return state || {};
}