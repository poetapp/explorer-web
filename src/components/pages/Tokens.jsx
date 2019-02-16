import React, { useContext, useEffect, useState, useReducer } from 'react'

import { Main } from 'components/templates/Main'
import { Tokens as TokensOrganism } from 'components/organisms/Tokens'
import { parseJwt } from 'helpers/jwt'
import { useTokens, useCreateToken } from 'hooks/useTokens'
import { SessionContext } from 'providers/SessionProvider'

export const Tokens = () => {
  const [account, setAccount] = useContext(SessionContext)
  const [initialTokens, initialTokensServerError, initialTokensClientError] = useTokens(account?.token)
  const [createRequested, setCreateRequested] = useState(false)
  const [createdToken, createTokenServerError, createTokenClientError] = useCreateToken(createRequested && account?.token)
  const [tokens, dispatch] = useReducer(tokenReducer, [])

  useEffect(() => {
    if (initialTokensServerError || initialTokensClientError) {
      console.error(initialTokensServerError || initialTokensClientError)
      setAccount(null)
    }
  }, [initialTokensServerError, initialTokensClientError])

  useEffect(() => {
    if (createTokenServerError || createTokenClientError) {
      console.error(createTokenServerError || createTokenClientError)
    }
  }, [createTokenServerError, createTokenClientError])

  useEffect(() => {
    if (initialTokens)
      dispatch({
        type: 'add',
        tokens: initialTokens,
      })
  }, [initialTokens])

  useEffect(() => {
    if (createdToken) {
      dispatch({
        type: 'add',
        tokens: [createdToken.apiToken],
      })
      setCreateRequested(false)
    }
  }, [createdToken])

  return (
    <Main>
      <TokensOrganism tokens={tokens} onCreateToken={() => setCreateRequested(true)} />
    </Main>
  )
}

const tokenReducer = (tokens, action) => {
  switch (action.type) {
    case 'add':
      const parsedTokens = action.tokens.map(serializedTokenToToken)
      return [
        ...tokens,
        ...parsedTokens,
      ]
    default:
      throw new Error()
  }
}

const serializedTokenToToken = serializedToken => ({
  ...parseJwt(serializedToken),
  serializedToken,
})