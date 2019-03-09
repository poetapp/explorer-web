import React, { useState, useEffect, useContext } from 'react'

import { SignUp as SignUpOrganism } from 'components/organisms/SignUp'
import { SessionContext } from 'providers/SessionProvider'
import { ApiContext } from 'providers/ApiProvider'

export const SignUp = () => {
  const [api, isBusy] = useContext(ApiContext)
  const [credentials, setCredentials] = useState(null)
  const [_, setAccount] = useContext(SessionContext)

  useEffect(() => {
    if (credentials)
      api.accountCreate(credentials).then(setAccount)
  }, [credentials])

  return <SignUpOrganism onSubmit={setCredentials} />
}
