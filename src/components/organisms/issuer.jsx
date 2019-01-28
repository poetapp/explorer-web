import React from 'react'
import { Link } from 'react-router-dom'

import classNames from './issuer.scss'

export const IssuerById = ({ works }) => (
  <section className={classNames.issuer}>
    <div className={classNames.letterBoxing}>
      <Profile />
      <Works works={works} />
    </div>
  </section>
)

const Profile = () => (
  <section className={classNames.profile}>
    <img src="https://uploads-ssl.webflow.com/5bb569975d49a4750c2b4f1e/5c0e925ca85aebe5945307ac_Screen%20Shot%202018-12-10%20at%2010.20.23%20AM.png"/>
    <h1>Oscar Wilde</h1>
    <h2>Two roads diverged in a yellow wood, and sorry I could not travel both.</h2>
    <span>oscar.wilde@po.et</span>
    <a href="#">
      <img src="https://uploads-ssl.webflow.com/5bb569975d49a4750c2b4f1e/5c140b52d26a3a44ecee97a0_POE-logo-white.svg" />
      <span>Tip POE</span>
    </a>
  </section>
)

const Works = ({ works }) => works && (
  <ul className={classNames.works}>
    {works.map(work =>
      <Work work={work} key={work.id} />
    )}
  </ul>
)

const Work = ({ work }) => (
  <li>
    <h1><Link to={`/works/${work.id}`}>{work.claim.name}</Link></h1>
    <h2>{work.claim.author}</h2>
    <h3>{work.claim.datePublished}</h3>
  </li>
)