import React, { useContext, useEffect, useState, useReducer } from 'react'

import { Main } from 'components/templates/Main'
import { Tokens as TokensOrganism } from 'components/organisms/Tokens'
import { parseJwt } from 'helpers/jwt'
import { useCreateToken, getTokens } from 'hooks/useTokens'
import { SessionContext } from 'providers/SessionProvider'

export const Tokens = () => {
  const [account, setAccount] = useContext(SessionContext)
  const [createRequested, setCreateRequested] = useState(false)
  const [createdToken, createTokenServerError, createTokenClientError] = useCreateToken(createRequested && account?.token)
  const [tokens, dispatch] = useReducer(tokenReducer, [])

  const clearAccount = () => setAccount(null)

  const getTokens = async token => {
    const response = await fetchGetTokens(token)
    if (response.status === 200) {
      const tokens = await response.json().then(_ => _.apiTokens)
      dispatch({
        type: 'add',
        tokens,
      })
    } else {
      console.error(await response.text())
      clearAccount()
    }
  }

  useEffect(() => {
    if (createTokenServerError || createTokenClientError) {
      console.error(createTokenServerError || createTokenClientError)
    }
  }, [createTokenServerError, createTokenClientError])

  useEffect(() => {
    getTokens(account.token).catch(console.error)
  }, [])

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

const fetchGetTokens = token => fetch(url, {
  headers: {
    token,
  }
})

const url = 'https://api.poetnetwork.net/tokens'