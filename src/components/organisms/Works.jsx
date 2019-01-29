import React from 'react'

import { Works as WorksMolecule } from 'components/molecules/Works'

import classNames from './Works.scss'

export const Works = ({ works }) => (
  <section className={classNames.works}>
    <WorksMolecule works={works} />
  </section>
)