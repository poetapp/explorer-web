import * as moment from 'moment'
import { Claim } from 'poet-js'
import * as React from 'react'

export function TimeElapsedSinceCreation(props: { claim: Claim }) {
  const dateCreated = props.claim && props.claim.dateCreated
  return (
    <span>{dateCreated ? moment(dateCreated).fromNow() : '(unconfirmed)'}</span>
  )
}
