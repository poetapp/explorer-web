import { pipe } from 'ramda'
import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import { Logo } from 'Images'

import { PasswordRepeat } from 'components/molecules/PasswordRepeat'
import { eventToValue } from 'helpers/eventToValue'
import { ApiContext } from 'providers/ApiProvider'
import { SessionContext } from 'providers/SessionProvider'

import classNames from './SignUp.scss'

export const SignUp = () => {
  const [api, isBusy] = useContext(ApiContext)
  const [_, setAccount] = useContext(SessionContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = event => {
    event.preventDefault()
    api.accountCreate({ email, password }).then(setAccountFromApiResponse)
  }

  const setAccountFromApiResponse = token => token && setAccount({
    token,
    email,
  })

  return (
    <section className={classNames.signup}>
      <Link to='/'><img src={Logo} /></Link>
      <h1>Sign Up to Start Using Po.et Today</h1>
      <form onSubmit={onSubmit} >
        <input
          type="email"
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
        <PasswordRepeat password={password} />
        <p>Signing up means that you have read and agreed to the <Link to="/tos">terms of service</Link></p>
        <nav>
          <button type="submit" disabled={isBusy}>{ !isBusy ? 'Sign Up' : 'Please wait...' }</button>
          <nav>
            <Link to="/login">Already have an account?</Link>
          </nav>
        </nav>
      </form>
    </section>
  )
}
