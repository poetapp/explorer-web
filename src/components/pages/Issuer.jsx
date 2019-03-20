import React, { useContext } from 'react'

import { DefaultAvatar, LogoWhite } from 'Images'

import { Works } from 'components/molecules/Works'
import { Main } from 'components/templates/Main'
import { useWorkByIssuer } from 'hooks/useWork'
import {ApiContext} from 'providers/ApiProvider'

import classNames from './Issuer.scss'

export const IssuerById = ({ id }) => {
  const works = useWorkByIssuer(id)

  return (
    <Main>
      <section className={classNames.issuer}>
        <div className={classNames.letterBoxing}>
          <Profile issuer={id} />
          <Works works={works} />
        </div>
      </section>
    </Main>
  )
}

const Profile = ({ issuer }) => {
  const [api, isBusy, useApi] = useContext(ApiContext)
  const account = useApi('accountGet', issuer)

  return (
    <section className={classNames.profile}>
      <img src={DefaultAvatar}/>
      <h1>{account?.name}</h1>
      <h2>{account?.bio}</h2>
      <span>{account?.email}</span>
      <a href="#">
        <img src={LogoWhite} />
        <span>Tip POE</span>
      </a>
    </section>
  )
}
