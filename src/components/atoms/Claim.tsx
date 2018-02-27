import * as React from 'react'
import { Claim } from 'poet-js'
import * as moment from 'moment'

export function TimeElapsedSinceCreation(props: { claim: Claim }) {
  const dateCreated = props.claim && props.claim.dateCreated
  return (
    <span>
      {
      dateCreated
        ? moment(dateCreated).fromNow()
        : '(unconfirmed)'
      }
    </span>
  )
}
