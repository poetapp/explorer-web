import React, { useContext } from 'react'

import { Login as LoginOrganism } from 'components/organisms/Login'
import { ApiContext } from 'providers/ApiProvider'
import { SessionContext } from 'providers/SessionProvider'


export const Login = () => {
  const [api, isBusy] = useContext(ApiContext)
  const [_, setAccount] = useContext(SessionContext)

  const setAccountWithEmail = email => account => setAccount(account && { ...account, email })

  const onSubmit = credentials => {
    api.login(credentials).then(setAccountWithEmail(credentials.email))
  }

  return <LoginOrganism onSubmit={onSubmit} />
}
