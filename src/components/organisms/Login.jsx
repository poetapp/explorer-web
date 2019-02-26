import { pipe } from 'ramda'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Logo } from 'Images'

import { eventToValue } from 'helpers/eventToValue'

import classNames from './Login.scss'

export const Login = ({ onSubmit }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitWrapper = credentials => event => {
    event.preventDefault()
    onSubmit(credentials)
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
          <button type="submit" onClick={onSubmitWrapper({ email, password })}>Log In</button>
          <nav>
            <Link to="/signup">Don't have an account yet?</Link>
            <Link to="/forgotpassword">Forgot Password?</Link>
          </nav>
        </nav>
      </form>
    </section>
  )
}
