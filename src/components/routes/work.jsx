import React from 'react'

import { locationToNetwork } from 'helper/query'
import { WorkById as WorkByIdPage } from 'components/pages/work'

export const WorkById = ({ match, location }) => {
  const { id } = match.params
  const network = locationToNetwork(location)

  return (
    <WorkByIdPage id={id} network={network} />
  )
}
