import React from 'react'

import { WorkById as WorkByIdPage } from 'components/pages/Work'

export const WorkById = ({ match }) => {
  const { id } = match.params
  return (
    <WorkByIdPage id={id} />
  )
}
