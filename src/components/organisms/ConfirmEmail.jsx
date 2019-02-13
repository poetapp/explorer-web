import React from 'react'
import { Link } from 'react-router-dom'

import { useCounterLoop } from 'hooks/useCounterLoop'

import { Logo } from 'Images'

import classNames from './ConfirmEmail.scss'

export const ConfirmEmail = ({ loginToken, error }) => (
  <section className={classNames.confirmEmail}>
    <Header />
    <Main loginToken={loginToken} error={error} />
  </section>
)

const Header = () => (
  <header>
    <img src={Logo} />
    <h1>Email Address Verification</h1>
  </header>
)

const Main = ({ loginToken, error }) => (
  <main>
    {
      !loginToken && !error
        ? <InProgress />
        : loginToken
        ? <Success />
        : <Failure reason={error} />
    }
  </main>
)

const InProgress = () => {
  const counter = useCounterLoop()
  return (
    <section>
      <h1>Verifying your email{'.'.repeat(counter + 1)}</h1>
    </section>
  )
}

const Success = () => (
  <section>
    <h1>Thank you! Your email is now verified :)</h1>
    <Link to="/">Go to dashboard</Link>
  </section>
)

const Failure = ({ reason }) => (
  <section>
    <h1>Oww, we could not verify your email address :(</h1>
    <h2>{reason}</h2>
  </section>
)