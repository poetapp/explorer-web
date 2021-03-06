import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Logo } from 'Images'

import { Email } from 'components/shared/Email'
import { ApiContext } from 'providers/ApiProvider'

import classNames from './ForgotPassword.scss'

export const ForgotPassword = () => {
  const { api } = useContext(ApiContext)
  const [isDone, setIsDone] = useState(false)
  const [email, setEmail] = useState(null)

  useEffect(() => {
    if (email)
      api.passwordReset({ email }).then(() => setIsDone(true))
  }, [email])

  return !isDone
    ? <ForgotPasswordInput onSubmit={setEmail} />
    : <ForgotPasswordSent email={email} />
}

const ForgotPasswordInput = ({ onSubmit }) => {
  const [email, setEmail] = useState('')

  const onSubmitWrapper = email => event => {
    event.preventDefault()
    onSubmit(email)
  }

  return (
    <Template>
      <h2>That's alright, we can reset it for you. All we need is the email address you signed up with.</h2>
      <form onSubmit={onSubmitWrapper(email)}>
        <Email value={email} onChange={setEmail}/>
        <nav>
          <button type="submit">Send Email</button>
          <nav>
            <Link to="/login">Go to login</Link>
          </nav>
        </nav>
      </form>
    </Template>
  )
}

export const ForgotPasswordSent = ({ email }) => (
  <Template>
    <h2>Great! An email has been sent to {email} with a link to reset the password. Please check your inbox.</h2>
    <Link to="/login">Go to login</Link>
  </Template>
)

const Template = ({ children }) => (
  <section className={classNames.forgotPassword}>
    <Link to='/'><img src={Logo} /></Link>
    <h1>Forgot password?</h1>
    { children }
  </section>
)
