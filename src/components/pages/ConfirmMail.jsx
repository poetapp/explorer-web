import React, { useEffect, useContext } from 'react'

import { ConfirmEmail as ConfirmEmailOrganism } from 'components/organisms/ConfirmEmail'
import { useConfirmEmail } from 'effects/useConfirmMail'
import { useProfile } from 'effects/useProfile'
import { SessionContext } from 'providers/SessionProvider'

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
      })
  }, [loginToken, profile])

  useLogIfTruthy(confirmEmailError)
  useLogIfTruthy(profileError)

  return <ConfirmEmailOrganism loginToken={loginToken} error={confirmEmailError} />
}
