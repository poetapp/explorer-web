import React from 'react'
import { Link } from 'react-router-dom'

import { main, arrow } from './Main.scss'

export const Main = ({ children }) => (
  <section className={main}>
    <header>
      <Link to="/">
        <img src="https://uploads-ssl.webflow.com/5bb569975d49a4750c2b4f1e/5c0fd7884a45850c86a7ca43_poet-quill.svg" />
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