import React, { useContext, useState, useEffect } from 'react'

import { Input, Done } from 'components/organisms/ChangePasswordWithToken'
import { ApiContext } from 'providers/ApiProvider'

export const ChangePasswordWithToken = ({ token }) => {
  const [api, isBusy] = useContext(ApiContext)
  const [isDone, setIsDone] = useState(false)
  const [password, setPassword] = useState(null)

  useEffect(() => {
    if (password)
      api.passwordChangeWithToken(token, password).then(console.log).then(() => setIsDone(true))
  }, [password])

  return !isDone
    ? <Input onSubmit={setPassword} />
    : <Done />
}
