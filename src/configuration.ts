interface Auth {
  readonly host: string
  readonly path: string
}

interface Api {
  readonly explorer: string
  readonly user: string
  readonly auth: Auth
  readonly mockApp: string
  readonly blockchain: string
}

interface ImageUpload {
  readonly maxWidth: number
  readonly maxHeight: number
}

interface Pagination {
  readonly limit: number
  readonly visiblePageCount: number
}

interface Configuration {
  readonly api: Api
  readonly imageUpload: ImageUpload
  readonly dateFormat: string
  readonly dateTimeFormat: string
  readonly pagination: Pagination
  readonly useMockSigner: boolean
}

export const Configuration: Configuration = require("Configuration")
