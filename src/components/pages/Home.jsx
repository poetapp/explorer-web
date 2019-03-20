import React from 'react'
import { Link } from 'react-router-dom'

import { Main } from 'components/templates/Main'

import { Logo } from 'Images'

import classNames from './Home.scss'

export const Home = () => (
  <Main>
    <section className={classNames.home}>
      <HomeMain/>
      <Footer/>
    </section>
  </Main>
)

const HomeMain = () => (
  <main>
    <h1>Welcome to the Po.et Network</h1>
    <h2>Po.et is a decentralized protocol for content ownership, discovery, and monetization in media.</h2>
    <div>
      <a className={classNames.makeClaim} target="_blank" href={'https://docs.poetnetwork.net/use-poet/create-your-first-claim.html'}>Make a Claim</a>
      <a className={classNames.integrate} target="_blank" href="https://www.po.et/integrate">Integrate with Po.et</a>
    </div>
  </main>
)

const Footer = () => (
  <footer>
    <img src={Logo} />
    <ul>
      <li>Protocol</li>
      <li><Link to="/works">Explorer</Link></li>
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