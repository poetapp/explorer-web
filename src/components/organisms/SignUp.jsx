import { pipe } from 'ramda'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Logo } from 'Images'

import classNames from './SignUp.scss'

const eventToValue = event => event.currentTarget.value

export const SignUp = ({ onSubmit }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')

  const onSubmitWrapper = credentials => event => {
    event.preventDefault()
    if (password === passwordRepeat)
      onSubmit(credentials)
  }

  return (
    <section className={classNames.signup}>
      <Link to='/'><img src={Logo} /></Link>
      <h1>Sign Up to Start Using Po.et Today</h1>
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
        <input
          type="password"
          placeholder="Repeat Password"
          value={passwordRepeat}
          onChange={pipe(eventToValue, setPasswordRepeat)}
          required
        />
        <p>Signing up means that you have read and agreed to the <a href="#">terms of service</a></p>
        <nav>
          <button type="submit" onClick={onSubmitWrapper({ email, password })}>Sign Up</button>
          <nav>
            <Link to="/login">Already have an account?</Link>
          </nav>
        </nav>
      </form>
    </section>
  )
}
