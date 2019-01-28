import React from 'react'

import { WorkById as WorkByIdPage } from 'components/pages/work'

export const WorkById = ({ match }) => {
  const { id } = match.params
  return (
    <WorkByIdPage id={id} />
  )
}
