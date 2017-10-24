import { InsightClient as Client, ApiMode } from 'insight-client-js'

export const InsightClient = new Client(ApiMode.Test, fetch)