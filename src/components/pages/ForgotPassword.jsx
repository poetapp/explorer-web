import React, { useContext } from 'react'

import { ForgotPassword as ForgotPasswordOrganism } from 'components/organisms/ForgotPassword'
import { ApiContext } from 'providers/ApiProvider'

export const ForgotPassword = () => {
  const [api, isBusy] = useContext(ApiContext)
  const [isDone, setIsDone] = useContext(ApiContext)

  const onSubmit = email => {
    api.passwordReset(email).then(() => setIsDone(true))
  }

  return <ForgotPasswordOrganism onSubmit={onSubmit} />
}
