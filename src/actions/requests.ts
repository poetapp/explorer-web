import { Action } from 'redux'

export interface DispatchesTransferRequested {
  transferRequested?(workId: string): TransferRequestedAction
}

export interface TransferRequestedAction extends Action {
  readonly workId: string
}
