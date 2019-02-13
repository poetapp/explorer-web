import React from 'react'
import { Link } from 'react-router-dom'

import { useConfirmEmail } from 'effects/useConfirmMail'
import { useCounterLoop } from 'effects/useCounterLoop'

export const ConfirmMail = ({ token }) => {
  const { loginToken, error } = useConfirmEmail(token)

  return !loginToken && !error
    ? <InProgress />
    : loginToken
    ? <Success />
    : <Failure reason={error} />
}

const InProgress = () => {
  const counter = useCounterLoop()
  return (
    <section><h1>Verifying your email{'.'.repeat(counter + 1)}</h1></section>
  )
}

const Success = () => (
  <section>
    <h1>Thanks for verifying your email :)</h1>
    <h2>Click <Link to="/">here</Link> to go to your dashboard.</h2>
  </section>
)

const Failure = ({ reason }) => (
  <section>
    <h1>Oww, we could not verify your email address :(</h1>
    <h2>Looks like {reason}</h2>
  </section>
)