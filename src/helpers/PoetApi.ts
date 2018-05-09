import { Work } from 'poet-js'

export namespace Api {
  export namespace WorkById {
    export interface Response extends Work {
      readonly timestamp?: {
        readonly transactionId: string
        readonly outputIndex: string
        readonly prefix: string
        readonly version: string
        readonly ipfsHash: string
        readonly blockHeight: string
        readonly blockHash: string
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
      sortBy?: string
    }) {
      return '/works'
    }
  }
  export enum Headers {
    TotalCount = '',
  }
}
