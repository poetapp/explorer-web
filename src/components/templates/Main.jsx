import classnames from 'classnames'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { Quill, DefaultAvatar } from 'Images'
import { SessionContext } from 'providers/SessionProvider'

import classNames from './Main.scss'

const SessionActive = ({ account, onSignOut }) => (
  <ul>
    <li><NewClaim/></li>
    <li><AccountDropDown account={account} onSignOut={onSignOut}/></li>
  </ul>
)

const NewClaim = () => <Link to="/new-claim" className={classNames.newClaim}>New Claim</Link>

const AccountDropDown = ({ account, onSignOut }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  return (
    <section className={classNames.account}>
      <header onClick={() => setMenuIsOpen(!menuIsOpen)}>
        <img src={DefaultAvatar}/>
        <div className={classNames.cue}>⌄</div>
      </header>
      <ul className={classnames({ [classNames.open]: menuIsOpen })}>
        <li className={classNames.email}>Logged in as <strong>{account.email}</strong></li>
        <li className={classNames.tokens}><Link to="/tokens">API Keys</Link></li>
        <li className={classNames.logout}><a href="#" onClick={onSignOut}>Logout</a></li>
      </ul>
    </section>
  )
}

const SessionInactive = () => (
  <ul className={classNames.sessionInactive}>
    <li><Link to="/login">Login</Link></li>
    <li><Link to="/signup" className={classNames.signUp}>Sign Up</Link></li>
  </ul>
)

const SessionActions = ({ account, onSignOut }) => !account
  ? <SessionInactive/>
  : <SessionActive account={account} onSignOut={onSignOut} />

const More = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleIsOpen = () => setIsOpen(!isOpen)

  return (
    <nav className={classNames.more}>
      <span onClick={toggleIsOpen}>More</span>
      <ul className={classnames({ open: isOpen })}>
        <li><a href="https://blog.po.et">Blog</a></li>
        <li><a href="https://www.po.et/roadmap">Roadmap</a></li>
        <li><a href="https://www.po.et/faq">FAQ</a></li>
        <li><a href="https://www.po.et/about">About</a></li>
      </ul>
    </nav>
  )
}

const Logo = () => (
  <Link to="/" className={classNames.logo}>
    <img src={Quill} />
  </Link>
)

const GlobalNavigation = () => (
  <ul className={classNames.globalNavigation}>
    <li><Link to="/works">Explore</Link></li>
    <li><a href="https://docs.poetnetwork.net/" target="_blank">Docs</a></li>
    <li><a href="https://www.po.et/integrate" target="_blank">Integrations</a></li>
    <li className={classNames.arrow}><More /></li>
  </ul>
)

export const Main = ({ children }) => {
  const [account, setAccount] = useContext(SessionContext)

  const clearToken = () => setAccount()

  return (
    <section className={classNames.main}>
      <header>
        <Logo/>
        <GlobalNavigation/>
        <SessionActions account={account} onSignOut={clearToken} />
      </header>
      <main>
        { children }
      </main>
    </section>
  )
}