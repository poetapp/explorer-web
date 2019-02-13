import React from 'react'

import { useConfirmEmail } from 'effects/useConfirmMail'
import { ConfirmEmail as ConfirmEmailOrganism } from 'components/organisms/ConfirmEmail'

export const ConfirmMail = ({ token }) => {
  const { loginToken, error } = useConfirmEmail(token)

  return <ConfirmEmailOrganism loginToken={loginToken} error={error} />
}
