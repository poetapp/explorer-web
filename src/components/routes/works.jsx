import React from 'react'

import { Works as WorksPage } from 'components/pages/works'

export const Works = ({ match }) => {
  const { id } = match.params
  return (
    <WorksPage id={id} />
  )
}
