import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import { useConfirmEmail } from 'hooks/useConfirmMail'
import { useCounterLoop } from 'hooks/useCounterLoop'
import { SessionContext } from 'providers/SessionProvider'

import { Logo } from 'Images'

import classNames from './ConfirmEmail.scss'

export const ConfirmMail = ({ token }) => {
  const { loginToken, error: confirmEmailError } = useConfirmEmail(token)
  const [account, setAccount] = useContext(SessionContext)

  useEffect(() => {
    if (loginToken)
      setAccount()
  }, [loginToken])

  return (
    <section className={classNames.confirmEmail}>
      <Header />
      <Main loginToken={loginToken} error={confirmEmailError} />
    </section>
  )
}

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
    <Link to="/login">Go to login</Link>
  </section>
)

const Failure = ({ reason }) => (
  <section>
    <h1>Oww, we could not verify your email address :(</h1>
    <h2>{reason}</h2>
  </section>
)