import * as moment from 'moment'
// import { Claim } from '@po.et/poet-js'
import * as React from 'react'

export interface Claim {
  [key: string]: any
}

export function TimeElapsedSinceCreation(props: { claim: Claim }) {
  const dateCreated = props.claim && props.claim.dateCreated
  return <span>{dateCreated ? moment(dateCreated).fromNow() : '(unconfirmed)'}</span>
}
