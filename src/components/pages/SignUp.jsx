import React, { useState, useEffect, useContext } from 'react'

import { useSignUp } from 'hooks/useSignUp'
import { SessionContext } from 'providers/SessionProvider'
import { SignUp as SignUpOrganism } from 'components/organisms/SignUp'

export const SignUp = () => {
  const [credentials, setCredentials] = useState(null)
  const [_, setAccount] = useContext(SessionContext)
  const { account, error } = useSignUp(credentials)

  useEffect(() => {
    if (account)
      setAccount(account)
  }, [account])

  error && console.error(error)

  return <SignUpOrganism onSubmit={setCredentials} />
}
