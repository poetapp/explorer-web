import * as moment from 'moment'
import * as React from 'react'

import { Claim } from '@po.et/poet-js'

export function TimeElapsedSinceCreation(props: { claim: Claim }) {
  const dateCreated = props.claim && props.claim.dateCreated
  return <span>{dateCreated ? moment(dateCreated).fromNow() : '(unconfirmed)'}</span>
}
