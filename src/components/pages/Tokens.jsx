import React, { useContext } from 'react'

import { Main } from 'components/templates/Main'
import { Tokens as TokensOrganism } from 'components/organisms/Tokens'
import { parseJwt } from 'helpers/jwt'
import { useTokens } from 'hooks/useTokens'
import { SessionContext } from 'providers/SessionProvider'

export const Tokens = () => {
  const [account, setAccount] = useContext(SessionContext)
  const [tokens, error] = useTokens(account?.token)
  const parsedTokens = tokens?.map(serializedToken => ({
    ...parseJwt(serializedToken),
    serializedToken,
  }))

  if (error) // === 'Expired token.'
    setAccount(null)

  return (
    <Main>
      <TokensOrganism tokens={parsedTokens} />
    </Main>
  )
}
