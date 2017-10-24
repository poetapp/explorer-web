import { Claim, WorkOffering, Work, Api } from 'poet-js';

import { FetchStatus } from '../enums/FetchStatus'

export interface PoetAppState {
  readonly session: SessionStore
  readonly profile: ProfileStore
  readonly fetch: FetchStore
  readonly modals: ModalStore
  readonly transfer: TransferStore
  readonly createWork: CreateWorkStore;
  readonly signTx: SignTransactionStore;
}

export interface SessionStore {
  readonly token: SessionToken
  readonly publicKey: string
}

export interface SessionToken {
  readonly publicKey: string
  readonly message: string
  readonly signature: string
}

export interface ProfileStore {
  readonly notifications: NotificationsStore
}

export interface NotificationsStore {
  readonly notifications: ReadonlyArray<Api.Notifications.Resource>;
  readonly unreadCount: number
  readonly totalCount: number
}

export interface FetchStore {
  [key: string]: FetchStoreEntry<any>
}

export interface FetchStoreEntry<T> {
  readonly status: FetchStatus
  readonly body?: T
  readonly error?: any
  readonly headers?: Headers;
}

export interface ModalStore {
  readonly login?: boolean;
  readonly signWork?: boolean;
  readonly signTx?: boolean;
  readonly transfer?: TransferModalStore;
  readonly purchaseLicense?: PurchaseLicenseStore;
  readonly createWorkResult?: boolean;
  readonly tryItOut?: boolean;
}

export interface TransferModalStore {
  readonly visible: boolean;
  readonly workId: string;
}

export interface PurchaseLicenseStore {
  readonly visible: boolean;
  readonly work: Work;
  readonly offering: WorkOffering;
  readonly success?: boolean;
  readonly resultId?: string;
}

export interface TransferStore {
  readonly requestId: string
  readonly success: boolean
  readonly targetPublicKey: string
}

export interface CreateWorkStore {
  readonly workClaim: Claim;
}

export interface SignTransactionStore {
  readonly requestId: string;
  readonly submitting: boolean;
  readonly success: boolean;
}