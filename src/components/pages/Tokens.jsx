import React, { useContext, useEffect, useState, useReducer } from 'react'

import { Main } from 'components/templates/Main'
import { Tokens as TokensOrganism } from 'components/organisms/Tokens'
import { parseJwt } from 'helpers/jwt'
import { ApiContext } from 'providers/ApiProvider'

export const Tokens = () => {
  const [api, isBusy] = useContext(ApiContext)
  const [tokens, dispatch] = useReducer(tokenReducer, [])

  const apiResponseToAction = type => payload => ({
    type,
    payload,
  })

  useEffect(() => {
    if (api)
      api.getTokens().then(apiResponseToAction('get')).then(dispatch)
  }, [api])

  const onCreateToken = () => {
    api.createToken().then(apiResponseToAction('create')).then(dispatch)
  }

  const onRemove = token => {
    api.deleteToken(token).then(_ => token).then(apiResponseToAction('delete')).then(dispatch)
  }

  return (
    <Main>
      <TokensOrganism tokens={tokens} onCreateToken={onCreateToken} onRemove={onRemove} createDisabled={isBusy} />
    </Main>
  )
}

const tokenReducer = (tokens, action) => {
  console.log('tokenReducer', action)

  if (action.payload === undefined)
    return tokens

  switch (action.type) {
    case 'get':
      const parsedTokens = action.payload.apiTokens.map(serializedTokenToToken)
      return [
        ...tokens,
        ...parsedTokens,
      ]
    case 'create':
      const parsedToken = serializedTokenToToken(action.payload.apiToken)
      return [
        ...tokens,
        parsedToken,
      ]
    case 'delete':
      return tokens.filter(({ serializedToken }) => serializedToken !== action.payload)
    default:
      throw new Error()
  }
}

const serializedTokenToToken = serializedToken => ({
  ...parseJwt(serializedToken),
  serializedToken,
})
