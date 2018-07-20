import { Configuration } from 'Configuration'

import { Frost } from '@poetapp/frost-client'

export const FrostClient = new Frost({ host: Configuration.frostApiUrl })