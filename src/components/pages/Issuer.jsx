import React, { useContext, useEffect, useState } from 'react'

import { DefaultAvatar, LogoWhite } from 'Images'

import { Works } from 'components/shared/Works'
import { PaginationWrapper } from 'components/shared/Pagination'
import { Main } from 'components/templates/Main'
import { ApiContext } from 'providers/ApiProvider'

import classNames from './Issuer.scss'

export const IssuerById = ({ id, pageSize = 10 }) => {
  const { api } = useContext(ApiContext)
  const [page, setPage] = useState(0)
  const [works, setWorks] = useState([])
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    const offset = page * 10
    api && api.worksGetByFilters({ issuer: id, offset }).then(setWorks)
  }, [api, page])

  useEffect(() => {
    window.scrollTo(0, 0)
    setPageCount(works?.totalCount ? Math.ceil(works.totalCount / pageSize) : 0)
  }, [works])

  return (
    <Main>
      <section className={classNames.issuer}>
        <div className={classNames.letterBoxing}>
          <Profile issuer={id} />
          <PaginationWrapper pageCount={pageCount} value={page} onChange={setPage}>
            <Works works={works || []} />
          </PaginationWrapper>
        </div>
      </section>
    </Main>
  )
}

const Profile = ({ issuer }) => {
  const { frostApi } = useContext(ApiContext)
  const [account, setAccount] = useState()

  useEffect(() => {
    if (frostApi)
      frostApi.accounts.find({ issuer }).then(setAccount)
  }, [frostApi])

  console.log({ account })

  return (
    <section className={classNames.profile}>
      <img src={DefaultAvatar}/>
      <h1>{account?.name || 'Po.et User'}</h1>
      <h2>{account?.bio}</h2>
      <span>{account?.email}</span>
      <span>{account?.ethereumRegistryAddress}</span>
      {account?.ethereumAddress_ && <TipPoe/>}
    </section>
  )
}

const TipPoe = () => (
  <a href="#">
    <img src={LogoWhite} />
    <span>Tip POE</span>
  </a>
)
