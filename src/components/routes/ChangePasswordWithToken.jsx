import React from 'react'

import { ChangePasswordWithToken as ChangePasswordWithTokenPage } from 'components/pages/ChangePasswordWithToken'

export const ChangePasswordWithToken = ({ location }) => {
  const token = (new URLSearchParams(location.search)).get('token')
  return (
    <ChangePasswordWithTokenPage token={token} />
  )
}
