import React from 'react'

import { IssuerById as IssuerByIdPage } from 'components/pages/Issuer'

export const IssuerById = ({ match }) => {
  const { id } = match.params
  return (
    <IssuerByIdPage id={id} />
  )
}
