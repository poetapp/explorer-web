export enum ClaimType {
  Identity = 'Identity',
  Work = 'Work',
}

export interface Claim {
  readonly [key: string]: string | number | Claim | ReadonlyArray<number | string | Claim>
}

export interface BaseVerifiableClaim {
  readonly '@context': any
  readonly issuer: string
  readonly issuanceDate: string
  readonly type: ClaimType
  readonly claim: Claim
}
export interface VerifiableClaim extends BaseVerifiableClaim {
  readonly id: string
}

export interface Work extends VerifiableClaim {}

export namespace Api {
  export namespace WorkById {
    export interface Response extends Work {
      readonly anchor?: {
        readonly blockHeight: string
        readonly blockHash: string,
        readonly transactionId: string
        readonly prefix: string
        readonly version: number
        readonly protocol: number
        readonly ipfsDirectoryHash: string
        readonly ipfsFileHash: string
      }
    }
    export function url(id: string) {
      return `/works/${id}`
    }
  }
  export namespace WorksByFilters {
    export interface Response extends Work {
      readonly timestamp?: any
    }
    export function url(params: {
      offset?: number
      limit?: number
      dateFrom?: number
      dateTo?: number
      query?: string
      sortBy?: string,
    }) {
      return '/works'
    }
  }
  export enum Headers {
    TotalCount = '',
  }
}
