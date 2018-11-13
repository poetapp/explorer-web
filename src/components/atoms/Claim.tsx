import * as moment from 'moment'
import * as React from 'react'

// import { Claim } from '@po.et/poet-js'
import { Claim } from 'helpers/PoetApi'

export function TimeElapsedSinceCreation(props: { claim: Claim }) {
  const dateCreated = props.claim && props.claim.dateCreated
  return <span>{dateCreated ? moment(dateCreated as string | number).fromNow() : '(unconfirmed)'}</span>
}
