import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import { useConfirmEmail } from 'hooks/useConfirmMail'
import { useCounterLoop } from 'hooks/useCounterLoop'
import { useProfile } from 'hooks/useProfile'
import { SessionContext } from 'providers/SessionProvider'

import { Logo } from 'Images'

import classNames from './ConfirmEmail.scss'

const useIfTruthy = fn => value => useEffect(() => {
  if (value)
    fn(value)
}, [value])

const useLogIfTruthy = useIfTruthy(console.error.bind(console))

export const ConfirmMail = ({ token }) => {
  const { loginToken, error: confirmEmailError } = useConfirmEmail(token)
  const { profile, error: profileError } = useProfile(loginToken)
  const [account, setAccount] = useContext(SessionContext)

  useEffect(() => {
    if (loginToken && profile)
      setAccount({
        token: loginToken,
        email: profile.email,
        issuer: profile.issuer,
      })
  }, [loginToken, profile])

  useLogIfTruthy(confirmEmailError)
  useLogIfTruthy(profileError)

  return (
    <section className={classNames.confirmEmail}>
      <Header />
      <Main loginToken={loginToken} error={confirmEmailError} issuer={profile?.issuer} />
    </section>
  )
}

const Header = () => (
  <header>
    <img src={Logo} />
    <h1>Email Address Verification</h1>
  </header>
)

const Main = ({ loginToken, issuer, error }) => (
  <main>
    {
      !loginToken && !error
        ? <InProgress />
        : loginToken
        ? <Success issuer={issuer} />
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

const Success = ({ issuer }) => (
  <section>
    <h1>Thank you! Your email is now verified :)</h1>
    <Link to={`/issuers/${issuer}`}>Go to dashboard</Link>
  </section>
)

const Failure = ({ reason }) => (
  <section>
    <h1>Oww, we could not verify your email address :(</h1>
    <h2>{reason}</h2>
  </section>
)