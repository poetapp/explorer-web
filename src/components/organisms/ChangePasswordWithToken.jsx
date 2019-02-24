import { pipe } from 'ramda'
import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Logo } from 'Images'

import classNames from './ChangePasswordWithToken.scss'

const eventToValue = event => event.currentTarget.value

export const Input = ({ onSubmit }) => {
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const input = useRef()

  const onSubmitWrapper = event => {
    event.preventDefault()

    if (password !== passwordRepeat)
      throw new Error('Passwords must match.')

    onSubmit(password)
  }

  useEffect(() => {
    if (password !== passwordRepeat)
      input.current.setCustomValidity('Passwords must match.')
    else
      input.current.setCustomValidity('')
  }, [password, passwordRepeat])

  return (
    <Template>
      <h2>Please enter the new password to your account:</h2>
      <form onSubmit={onSubmitWrapper}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={pipe(eventToValue, setPassword)}
          required
        />
        <input
          ref={input}
          type="password"
          placeholder="Repeat Password"
          value={passwordRepeat}
          onChange={pipe(eventToValue, setPasswordRepeat)}
          required
        />
        <nav>
          <button type="submit">Change Password</button>
          <nav>
            <Link to="/login">Go to login</Link>
          </nav>
        </nav>
      </form>
    </Template>
  )
}

export const Done = () => (
  <Template>
    <h2>All done! You can now login with your new password.</h2>
    <Link to="/login">Go to login</Link>
  </Template>
)

const Template = ({ children }) => (
  <section className={classNames.changePasswordWithToken}>
    <Link to='/'><img src={Logo} /></Link>
    <h1>Change Password</h1>
    { children }
  </section>
)
