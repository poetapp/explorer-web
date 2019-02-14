import React from 'react'

import { useWorks } from 'hooks/useWork'
import { Main } from 'components/templates/Main'
import { Works as WorksOrganism } from 'components/organisms/Works'

export const Works = () => {
  const works = useWorks()

  return (
    <Main>
      <WorksOrganism works={works}/>
    </Main>
  )
}
