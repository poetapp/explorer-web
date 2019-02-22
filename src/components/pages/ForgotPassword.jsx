import React, { useContext, useState, useEffect } from 'react'

import { ForgotPasswordInput, ForgotPasswordSent } from 'components/organisms/ForgotPassword'
import { ApiContext } from 'providers/ApiProvider'

export const ForgotPassword = () => {
  const [api, isBusy] = useContext(ApiContext)
  const [isDone, setIsDone] = useState(false)
  const [email, setEmail] = useState(null)

  useEffect(() => {
    if (email)
      api.passwordReset(email).then(() => setIsDone(true))
  }, [email])

  return !isDone
    ? <ForgotPasswordInput onSubmit={setEmail} />
    : <ForgotPasswordSent email={email} />
}
