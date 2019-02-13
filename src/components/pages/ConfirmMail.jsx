import React from 'react'

import { useConfirmEmail } from 'effects/useConfirmMail'
import { useProfile } from 'effects/useProfile'
import { ConfirmEmail as ConfirmEmailOrganism } from 'components/organisms/ConfirmEmail'

export const ConfirmMail = ({ token }) => {
  const { loginToken, error } = useConfirmEmail(token)
  const { profile, error: profileError } = useProfile(loginToken)

  console.log('profile', profile)
  console.log('profileError', profileError)

  return <ConfirmEmailOrganism loginToken={loginToken} error={error} />
}
