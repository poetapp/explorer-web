import React, { useContext, useEffect, useState, useReducer } from 'react'

import { Main } from 'components/templates/Main'
import { Tokens as TokensOrganism } from 'components/organisms/Tokens'
import { parseJwt } from 'helpers/jwt'
import { ApiContext } from 'providers/ApiProvider'

export const Tokens = () => {
  const api = useContext(ApiContext)
  const [tokens, dispatch] = useReducer(tokenReducer, [])

  const apiResponseToAction = type => tokens => ({
    type,
    tokens,
  })

  useEffect(() => {
    if (api)
      api.getTokens().then(apiResponseToAction('get')).then(dispatch)
  }, [api])

  const onCreateToken = () => {
    api.createToken().then(apiResponseToAction('create')).then(dispatch)
  }

  return (
    <Main>
      <TokensOrganism tokens={tokens} onCreateToken={onCreateToken} />
    </Main>
  )
}

const tokenReducer = (tokens, action) => {
  console.log('tokenReducer', action)

  if (action.tokens === undefined)
    return tokens

  switch (action.type) {
    case 'get':
      const parsedTokens = action.tokens.apiTokens.map(serializedTokenToToken)
      return [
        ...tokens,
        ...parsedTokens,
      ]
    case 'create':
      const parsedToken = serializedTokenToToken(action.tokens.apiToken)
      return [
        ...tokens,
        parsedToken,
      ]
    default:
      throw new Error()
  }
}

const serializedTokenToToken = serializedToken => ({
  ...parseJwt(serializedToken),
  serializedToken,
})
