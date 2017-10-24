import { Actions } from '../actions/index';
import { SignTransactionStore } from '../store/PoetAppState';

export function signTransactionReducer(state: SignTransactionStore, action: any): SignTransactionStore | {} {
  switch (action.type) {
    case Actions.Transactions.SignIdReceived:
      return { ...state, requestId: action.payload, submitting: false };
    case Actions.Transactions.Submitting:
      return { ...state, requestId: null, submitting: true };
    case Actions.Transactions.SubmittedSuccess:
      return { ...state, requestId: null, success: true };
    case Actions.Modals.SignTransaction.Hide:
      return { ...state, requestId: null, success: null };
  }
  return state || {};
}
