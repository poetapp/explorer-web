import React, { useContext, useEffect, useState } from 'react'

import { Main } from 'components/templates/Main'
import { Tokens as TokensOrganism } from 'components/organisms/Tokens'
import { parseJwt } from 'helpers/jwt'
import { useTokens, useCreateToken } from 'hooks/useTokens'
import { SessionContext } from 'providers/SessionProvider'

export const Tokens = () => {
  const [account, setAccount] = useContext(SessionContext)
  const [initialTokens, serverError, clientError] = useTokens(account?.token)
  const [createRequested, setCreateRequested] = useState(false)
  const [createdToken, createTokenServerError, createTokenClientError] = useCreateToken(createRequested && account?.token)
  const [tokens, setTokens] = useState([])
  const [parsedTokens, setParsedTokens] = useState([])

  useEffect(() => {
    if (serverError || clientError) {
      console.error(serverError || clientError)
      setAccount(null)
    }
  }, [serverError, clientError])

  useEffect(() => {
    if (createTokenServerError || createTokenClientError) {
      console.error(createTokenServerError || createTokenClientError)
    }
  }, [createTokenServerError, createTokenClientError])

  useEffect(() => {
    if (initialTokens)
      setTokens([
        ...tokens,
        ...initialTokens,
      ])
  }, [initialTokens])

  useEffect(() => {
    if (createdToken) {
      setTokens([
        ...tokens,
        createdToken.apiToken,
      ])
      setCreateRequested(false)
    }
  }, [createdToken])

  useEffect(() => {
    if (tokens)
      setParsedTokens(tokens.map(serializedToken => ({
        ...parseJwt(serializedToken),
        serializedToken,
      })))
  }, [tokens])

  return (
    <Main>
      <TokensOrganism tokens={parsedTokens} onCreateToken={() => setCreateRequested(true)} />
    </Main>
  )
}
