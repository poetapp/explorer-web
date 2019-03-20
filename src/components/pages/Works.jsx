import React from 'react'

import { Main } from 'components/templates/Main'
import { Works as WorksMolecule } from 'components/molecules/Works'
import { useWorks } from 'hooks/useWork'

import classNames from './Works.scss'

export const Works = () => {
  const works = useWorks()

  return (
    <Main>
      <section className={classNames.works}>
        <WorksMolecule works={works} />
      </section>
    </Main>
  )
}
