import classnames from 'classnames'
import React, { useContext, useState, useEffect } from 'react'

import { Main } from 'components/templates/Main'
import { Works as WorksMolecule } from 'components/shared/Works'
import { Pagination } from 'components/shared/Pagination'
import { ApiContext } from 'providers/ApiProvider'

import classNames from './Works.scss'

const pageSize = 10

export const Works = () => {
  const [api, isBusy, useApi] = useContext(ApiContext)
  const [page, setPage] = useState(0)
  const [works, setWorks] = useState([])

  useEffect(() => {
    const offset = page * 10
    api && api.worksGetByFilters({ offset }).then(setWorks)
  }, [api, page])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [works])

  return (
    <Main>
      <section className={classnames(classNames.works, { [classNames.busy]: isBusy })}>
        { works?.length > 0 && <Pagination pageCount={works.totalCount / pageSize} value={page} onChange={setPage} /> }
        <WorksMolecule works={works} />
        { works?.length > 0 && <Pagination pageCount={works.totalCount / pageSize} value={page} onChange={setPage} /> }
      </section>
    </Main>
  )
}
