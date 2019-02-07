import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { Quill } from 'Images'
import { SessionContext } from 'providers/SessionProvider'

import { main, arrow } from './Main.scss'

const SessionActions = ({ token, onSignOut }) => !token ? (
  <ul>
    <li><Link to="/login">Login</Link></li>
  </ul>
) : (
  <ul>
    <li><a href="#" onClick={onSignOut}>Sign Out</a></li>
  </ul>
)

export const Main = ({ children }) => {
  const [token, setToken] = useContext(SessionContext)

  const clearToken = () => setToken()

  return (
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
        <SessionActions token={token} onSignOut={clearToken} />
      </header>
      <main>
        { children }
      </main>
    </section>
  )
}