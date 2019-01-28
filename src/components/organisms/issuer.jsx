import React from 'react'
import { Link } from 'react-router-dom'

import classNames from './issuer.scss'

const images = {
  avatar: 'http://bestnycacupuncturist.com/wp-content/uploads/2016/11/anonymous-avatar-sm.jpg',
  quillWhite: 'https://uploads-ssl.webflow.com/5bb569975d49a4750c2b4f1e/5c140b52d26a3a44ecee97a0_POE-logo-white.svg',
}

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
    <img src={images.avatar}/>
    <h1>{name}</h1>
    <h2>Two roads diverged in a yellow wood, and sorry I could not travel both.</h2>
    <span>contact@po.et</span>
    <a href="#">
      <img src={images.quillWhite} />
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