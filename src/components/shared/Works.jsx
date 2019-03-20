import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'

import classNames from './Works.scss'

export const Works = ({ works }) => works && (
  <ul className={classNames.works}>
    {works.map(work =>
      <Work work={work} key={work.id} />
    )}
  </ul>
)

export const Work = ({ work }) => (
  <li>
    <h1><Link to={`/works/${work.id}`}>{work.claim.name}</Link></h1>
    <h2>{work.claim.author}</h2>
    <h3>{moment(work.claim.datePublished).format('MMMM Do, YYYY')}</h3>
  </li>
)