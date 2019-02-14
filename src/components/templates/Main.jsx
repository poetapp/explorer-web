import classnames from 'classnames'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { Quill, DefaultAvatar } from 'Images'
import { SessionContext } from 'providers/SessionProvider'

import classNames from './Main.scss'

const SessionActive = ({ account, onSignOut }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  return (
    <section className={classNames.account}>
      <img src={DefaultAvatar} onClick={() => setMenuIsOpen(!menuIsOpen)} />
      <ul className={classnames({ [classNames.open]: menuIsOpen })}>
        <li>Logged in as <strong>{account.email}</strong></li>
        <li className={classNames.tokens}><Link to="/tokens">API Keys</Link></li>
        <li><a href="#" onClick={onSignOut}>Logout</a></li>
      </ul>
    </section>
  )
}

const SessionInactive = () => (
  <ul className={classNames.sessionInactive}>
    <li><Link to="/login">Login</Link></li>
    <li><Link to="/signup">Sign Up</Link></li>
  </ul>
)

const SessionActions = ({ account, onSignOut }) => !account
  ? <SessionInactive/>
  : <SessionActive account={account} onSignOut={onSignOut} />

export const Main = ({ children }) => {
  const [account, setAccount] = useContext(SessionContext)

  const clearToken = () => setAccount()

  return (
    <section className={classNames.main}>
      <header>
        <Link to="/">
          <img src={Quill} />
        </Link>
        <ul>
          <li><Link to="/works">Explore</Link></li>
          <li><a href="https://docs.poetnetwork.net/" target="_blank">Docs</a></li>
          <li><a href="https://www.po.et/integrate" target="_blank">Integrate</a></li>
          <li className={classNames.arrow}>More</li>
        </ul>
        <SessionActions account={account} onSignOut={clearToken} />
      </header>
      <main>
        { children }
      </main>
    </section>
  )
}