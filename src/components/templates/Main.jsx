import React from 'react'
import { Link } from 'react-router-dom'

import { Quill } from 'Images'

import { main, arrow } from './Main.scss'

export const Main = ({ children }) => (
  <section className={main}>
    <header>
      <Link to="/">
        <img src={Quill} />
      </Link>
      <ul>
        <li><Link to="/works">Explore</Link></li>
        <li><a href="https://docs.poetnetwork.net/" target="_blank">Docs</a></li>
        <li><a href="https://www.po.et/integrate" target="_blank">Integrate</a></li>
        <li className={arrow}>More</li>
      </ul>
    </header>
    <main>
      { children }
    </main>
  </section>
)