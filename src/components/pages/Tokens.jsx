import React, { useContext, useEffect } from 'react'

import { Main } from 'components/templates/Main'
import { Tokens as TokensOrganism } from 'components/organisms/Tokens'
import { parseJwt } from 'helpers/jwt'
import { useTokens } from 'hooks/useTokens'
import { SessionContext } from 'providers/SessionProvider'

export const Tokens = () => {
  const [account, setAccount] = useContext(SessionContext)
  const [tokens, serverError, clientError] = useTokens(account?.token)
  const parsedTokens = tokens?.map(serializedToken => ({
    ...parseJwt(serializedToken),
    serializedToken,
  }))

  useEffect(() => {
    if (serverError || clientError) {
      console.error(serverError || clientError)
      setAccount(null)
    }
  }, [serverError, clientError])

  return (
    <Main>
      <TokensOrganism tokens={parsedTokens} />
    </Main>
  )
}
