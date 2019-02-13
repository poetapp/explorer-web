import React from 'react'
import { Link } from 'react-router-dom'

import { useCounterLoop } from 'effects/useCounterLoop'

import { Logo } from 'Images'

import classNames from './ConfirmEmail.scss'

export const ConfirmEmail = ({ loginToken, error }) => (
  <section className={classNames.confirmEmail}>
    <img src={Logo} />
    <h1>Email Address Verification</h1>
    <Main loginToken={loginToken} error={error} />
  </section>
)

const Main = ({ loginToken, error }) => (
  !loginToken && !error
    ? <InProgress />
    : loginToken
    ? <Success />
    : <Failure reason={error} />
)

const InProgress = () => {
  const counter = useCounterLoop()
  return (
    <section>
      <h2>Verifying your email{'.'.repeat(counter + 1)}</h2>
    </section>
  )
}

const Success = () => (
  <section>
    <h2>Thanks for verifying your email :)</h2>
    <h3>Click <Link to="/">here</Link> to go to your dashboard.</h3>
  </section>
)

const Failure = ({ reason }) => (
  <section>
    <h2>Oww, we could not verify your email address :(</h2>
    <h3>{reason}</h3>
  </section>
)