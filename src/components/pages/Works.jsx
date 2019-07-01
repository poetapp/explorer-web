import classnames from 'classnames'
import React, { useContext, useState, useEffect } from 'react'

import { Main } from 'components/templates/Main'
import { Works as WorksMolecule } from 'components/shared/Works'
import { ApiContext } from 'providers/ApiProvider'

import classNames from './Works.scss'

export const Works = () => {
  const [api, isBusy, useApi] = useContext(ApiContext)
  const [page, setPage] = useState(0)
  const [works, setWorks] = useState([])

  useEffect(() => {
    const offset = page * 10
    api && api.worksGetByFilters({ offset }).then(setWorks)
  }, [api, page])

  return (
    <Main>
      <section className={classNames.works}>
        <WorksMolecule works={works} />
        <Pagination value={page} onChange={setPage} />
      </section>
    </Main>
  )
}

const Pagination = ({ pageCount = 10, value, onChange }) => {
  return (
    <section className={classNames.pagination}>
      { Array(pageCount).fill(undefined).map((e, i) => i).map(i =>
        <button
          key={`key${i}`}
          onClick={() => onChange(i)}
          className={classnames({[classNames.selected]: value === i})}
        >
          {i}
        </button>
      ) }
    </section>
  )
}
