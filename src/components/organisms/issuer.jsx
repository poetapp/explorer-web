import React from 'react'

import { LogoWhite, DefaultAvatar } from 'Images'
import { Works } from 'components/molecules/Works'

import classNames from './issuer.scss'

export const IssuerById = ({ works }) => (
  <section className={classNames.issuer}>
    <div className={classNames.letterBoxing}>
      <Profile name={works && works[0] && works[0].claim && works[0].claim.author || 'Author'} />
      <Works works={works} />
    </div>
  </section>
)

const Profile = ({ name }) => (
  <section className={classNames.profile}>
    <img src={DefaultAvatar}/>
    <h1>{name}</h1>
    <h2>Two roads diverged in a yellow wood, and sorry I could not travel both.</h2>
    <span>contact@po.et</span>
    <a href="#">
      <img src={LogoWhite} />
      <span>Tip POE</span>
    </a>
  </section>
)
