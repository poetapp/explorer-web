import { pipe } from 'ramda'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Logo } from 'Images'

import classNames from './ForgotPassword.scss'

const eventToValue = event => event.currentTarget.value

export const ForgotPassword = ({ onSubmit }) => {
  const [email, setEmail] = useState('')

  const onSubmitWrapper = email => event => {
    event.preventDefault()
    onSubmit(email)
  }

  return (
    <section className={classNames.forgotPassword}>
      <Link to='/'><img src={Logo} /></Link>
      <h1>Forgot password?</h1>
      <h2>That's alright, we can reset it for you. All we need is the email address you signed up with.</h2>
      <form>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={pipe(eventToValue, setEmail)}
          required
        />
        <nav>
          <button type="submit" onClick={onSubmitWrapper(email)}>Send Email</button>
          <nav>
            <Link to="/login">Go to login</Link>
          </nav>
        </nav>
      </form>
    </section>
  )
}

export const ForgotPasswordSent = ({ email }) => (
  <section className={classNames.forgotPassword}>
    <Link to='/'><img src={Logo} /></Link>
    <h1>Forgot password?</h1>
    <h2>Great! An email has been sent to {email} with a link to reset the password. Please check your inbox.</h2>
    <Link to="/login">Go to login</Link>
  </section>
)
