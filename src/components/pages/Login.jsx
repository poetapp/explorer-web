import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Logo } from 'Images'

import { Email } from 'components/shared/Email'
import { Password } from 'components/shared/Password'
import { ApiContext } from 'providers/ApiProvider'
import { SessionContext } from 'providers/SessionProvider'

import classNames from './Login.scss'

export const Login = () => {
  const [api, isBusy, useApi, environment, network, frostApi] = useContext(ApiContext)
  const [account, setAccount] = useContext(SessionContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginResponse, setLoginResponse] = useState()
  const [getAccountResponse, setGetAccountResponse] = useState()

  const onSubmit = event => {
    event.preventDefault()
    frostApi.login({ email, password }).then(setLoginResponse)
  }

  useEffect(() => {
    if (loginResponse)
      setAccount({ token: loginResponse.token })
  }, [loginResponse])

  useEffect(() => {
    if (api?.token)
      api.accountGet(loginResponse.issuer).then(setGetAccountResponse)
  }, [api])

  useEffect(() => {
    if (getAccountResponse)
      setAccount({
        email,
        environment,
        ...loginResponse,
        ...getAccountResponse,
      })
  }, [getAccountResponse])

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
