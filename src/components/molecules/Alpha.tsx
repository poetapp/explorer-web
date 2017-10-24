import * as React from 'react'
import { Link } from 'react-router'
import * as classNames from 'classnames'

import { Images } from '../../images/Images'

import './Alpha.scss'

export function Alpha() {
  return (
    <section className={classNames('alpha')}>
      <img src={Images.Warning} />
      <main>
        <h1>Poet is currently in Alpha</h1>
        <small>Poet is still under active development and timestamping to the bitcoin testnet.
          For more information regarding future releases please visit <Link to="//po.et/roadmap">the roadmap</Link></small>
      </main>
    </section>
  )
}