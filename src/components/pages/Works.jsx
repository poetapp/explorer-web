import classnames from 'classnames'
import React, { useContext, useState, useEffect } from 'react'

import { Main } from 'components/templates/Main'
import { Works as WorksMolecule } from 'components/shared/Works'
import { PaginationWrapper } from 'components/shared/Pagination'
import { ApiContext } from 'providers/ApiProvider'

import classNames from './Works.scss'

const pageSize = 10

export const Works = () => {
  const [api, isBusy] = useContext(ApiContext)
  const [page, setPage] = useState(0)
  const [works, setWorks] = useState([])
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    const offset = page * 10
    api && api.worksGetByFilters({ offset }).then(setWorks)
  }, [api, page])

  useEffect(() => {
    window.scrollTo(0, 0)
    setPageCount(works?.totalCount ? Math.floor(works.totalCount / pageSize) : 0)
  }, [works])

  return (
    <Main>
      <section className={classnames(classNames.works, { [classNames.busy]: isBusy })}>
        <PaginationWrapper pageCount={pageCount} value={page} onChange={setPage}>
          <WorksMolecule works={works} />
        </PaginationWrapper>
      </section>
    </Main>
  )
}
