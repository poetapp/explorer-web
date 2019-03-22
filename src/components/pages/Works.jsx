import React, {useContext} from 'react'

import { Main } from 'components/templates/Main'
import { Works as WorksMolecule } from 'components/shared/Works'
import { ApiContext } from 'providers/ApiProvider'

import classNames from './Works.scss'

export const Works = () => {
  const [api, isBusy, useApi] = useContext(ApiContext)
  const works = useApi('worksGetByFilters')

  return (
    <Main>
      <section className={classNames.works}>
        <WorksMolecule works={works || []} />
      </section>
    </Main>
  )
}
