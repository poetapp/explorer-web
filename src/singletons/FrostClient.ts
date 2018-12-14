import { Configuration } from 'configuration'

import { Frost } from '@po.et/frost-client'

export const FrostClient = new Frost({ host: Configuration.frostApiUrl })
