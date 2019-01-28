import React from 'react'
import { Link } from 'react-router-dom'

import classNames from './Home.scss'

const poetLogo = 'https://uploads-ssl.webflow.com/5bb569975d49a4750c2b4f1e/5c0e8d3d498ec76b8ec98128_poet-logo.svg'

export const Home = () => (
  <section className={classNames.home}>
    <Main/>
    <Footer/>
  </section>
)

const Main = () => (
  <main>
    <h1>Welcome to the Po.et Network</h1>
    <h2>Po.et is a decentralized protocol for content ownership, discovery, and monetization in media.</h2>
    <div>
      <Link className={classNames.makeClaim} to={''}>Make a Claim</Link>
      <a className={classNames.integrate} href="https://www.po.et/integrate">Integrate with Po.et</a>
    </div>
  </main>
)

const Footer = () => (
  <footer>
    <img src={poetLogo} />
    <ul>
      <li>Protocol</li>
      <li>Explorer</li>
      <li><a href="https://docs.poetnetwork.net/">Documentation</a></li>
    </ul>
    <ul>
      <li>Company</li>
      <li><a href="https://www.po.et/roadmap">Roadmap</a></li>
      <li><a href="https://www.po.et/integrate">Integrations</a></li>
      <li><a href="https://www.po.et/faq">FAQ</a></li>
      <li><a href="https://www.po.et/about">About</a></li>
    </ul>
    <ul>
      <li>Social</li>
      <li><a href="https://twitter.com/_poetproject">Twitter</a></li>
      <li><a href="https://github.com/poetapp/">GitHub</a></li>
      <li><a href="https://t.me/joinchat/GKMQ1kOQSdXVZpN1Rygcdw">Telegram</a></li>
      <li><a href="https://www.reddit.com/r/poetproject/">Reddit</a></li>
      <li><a href="https://www.linkedin.com/company/poetchain/">LinkedIn</a></li>
    </ul>
  </footer>
)