import React from 'react'

import { ConfirmMail as ConfirmMailPage } from 'components/pages/ConfirmMail'

export const ConfirmMail = ({ location }) => {
  const token = (new URLSearchParams(location.search)).get('token')
  return (
    <ConfirmMailPage token={token} />
  )
}
