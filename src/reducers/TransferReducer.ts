import { Actions } from '../actions/index';

export function transferReducer(state: any, action: any) {
  switch (action.type) {
    case Actions.Transfer.TransferRequested:
      return { ...state, workId: action.workId };
    case Actions.Transfer.TransferIdReceived:
      return { ...state, requestId: action.payload };
    case Actions.Transfer.Success:
      return { ...state, success: true };
    case Actions.Modals.Transfer.Dismissed:
    case Actions.Modals.Transfer.Hide:
      return { ...state, requestId: null, workId: null, targetPublicKey: null };
    case Actions.Transfer.SetTransferTarget:
      return { ...state, success: null, targetPublicKey: action.payload };
  }
  return state || {};
}
