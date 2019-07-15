import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { Logo } from 'Images'

import { Email } from 'components/shared/Email'
import { Password } from 'components/shared/Password'
import { ApiContext } from 'providers/ApiProvider'
import { SessionContext } from 'providers/SessionProvider'

import classNames from './Login.scss'

export const Login = () => {
  const [api, isBusy, useApi, environment] = useContext(ApiContext)
  const [_, setAccount] = useContext(SessionContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const setAccountWithLoginData = ({ token, issuer }) => account => setAccount(account && {
    ...account,
    token,
    email,
    issuer,
    environment,
  })

  const onSubmit = async event => {
    event.preventDefault()
    const loginResponse = await api.login({ email, password })
    if (loginResponse)
      api.accountGet(loginResponse.issuer).then(setAccountWithLoginData(loginResponse))
  }

  return (
    <section className={classNames.login}>
      <Link to='/'><img src={Logo} /></Link>
      <h1>Log Into My Account</h1>
      <h2>Log in to make, view, and manage your claims on the Po.et Network.</h2>
      <form onSubmit={onSubmit}>
        <Email value={email} onChange={setEmail} />
        <Password value={password} onChange={setPassword} />
        <nav>
          <button type="submit" disabled={isBusy}>{ !isBusy ? 'Log In' : 'Please wait...'}</button>
          <nav>
            <Link to="/signup">Don't have an account yet?</Link>
            <Link to="/forgot-password">Forgot Password?</Link>
          </nav>
        </nav>
      </form>
    </section>
  )
}
