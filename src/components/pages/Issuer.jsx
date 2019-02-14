import React from 'react'

import { Main } from 'components/templates/Main'
import { IssuerById as IssuerByIdOrganism } from 'components/organisms/Issuer'
import { useWorkByIssuer } from 'hooks/useWork'

export const IssuerById = ({ id }) => {
  const works = useWorkByIssuer(id)

  return (
    <Main>
      <IssuerByIdOrganism works={works} />
    </Main>
  )
}
