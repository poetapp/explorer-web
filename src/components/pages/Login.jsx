import { pipe } from 'ramda'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { Logo } from 'Images'

import { eventToValue } from 'helpers/eventToValue'
import { ApiContext } from 'providers/ApiProvider'
import { SessionContext } from 'providers/SessionProvider'

import classNames from './Login.scss'

export const Login = () => {
  const [api, isBusy] = useContext(ApiContext)
  const [_, setAccount] = useContext(SessionContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const setAccountWithEmail = email => account => setAccount(account && { ...account, email })

  const onSubmit = event => {
    event.preventDefault()
    api.login({ email, password }).then(setAccountWithEmail(email))
  }

  return (
    <section className={classNames.login}>
      <Link to='/'><img src={Logo} /></Link>
      <h1>Log Into My Account</h1>
      <h2>Log in to make, view, and manage your claims on the Po.et Network.</h2>
      <form>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={pipe(eventToValue, setEmail)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={pipe(eventToValue, setPassword)}
          required
        />
        <nav>
          <button type="submit" onClick={onSubmit} disabled={isBusy}>{ !isBusy ? 'Log In' : 'Please wait...'}</button>
          <nav>
            <Link to="/signup">Don't have an account yet?</Link>
            <Link to="/forgotpassword">Forgot Password?</Link>
          </nav>
        </nav>
      </form>
    </section>
  )
}
