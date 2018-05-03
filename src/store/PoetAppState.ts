import { FetchStatus } from '../enums/FetchStatus'

export interface PoetAppState {
  readonly fetch: FetchStore
  readonly modals: ModalStore
}

export interface FetchStore {
  [key: string]: FetchStoreEntry<any>
}

export interface FetchStoreEntry<T> {
  readonly status: FetchStatus
  readonly body?: T
  readonly error?: any
  readonly headers?: Headers
}

export interface ModalStore {
  readonly login?: boolean
  readonly signWork?: boolean
  readonly signTx?: boolean
  readonly createWorkResult?: boolean
  readonly tryItOut?: boolean
}
