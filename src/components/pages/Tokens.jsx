import React, { useContext, useEffect, useReducer } from 'react'

import { Main } from 'components/templates/Main'
import { Tokens as TokensOrganism } from 'components/organisms/Tokens'
import { parseJwt } from 'helpers/jwt'
import { ApiContext } from 'providers/ApiProvider'

export const Tokens = () => {
  const [api, isBusy] = useContext(ApiContext)
  const [tokens, dispatch] = useReducer(tokenReducer, [])

  useEffect(() => {
    if (api)
      api.getTokens().then(apiResponseToAction('get')).then(dispatch)
  }, [api])

  const onCreateToken = () =>
    api.createToken().then(apiResponseToAction('create')).then(dispatch)

  const onRemove = token =>
    api.deleteToken(token).then(_ => token).then(apiResponseToAction('delete')).then(dispatch)

  return (
    <Main>
      <TokensOrganism tokens={tokens} onCreateToken={onCreateToken} onRemove={onRemove} createDisabled={isBusy} />
    </Main>
  )
}

const tokenReducer = (tokens, { type, payload }) => {
  console.log('tokenReducer', type, payload)

  if (payload === undefined)
    return tokens

  switch (type) {
    case 'get':
      const parsedTokens = payload.apiTokens.map(serializedTokenToToken)
      return [
        ...tokens,
        ...parsedTokens,
      ]
    case 'create':
      const parsedToken = serializedTokenToToken(payload.apiToken)
      return [
        ...tokens,
        parsedToken,
      ]
    case 'delete':
      return tokens.filter(({ serializedToken }) => serializedToken !== payload)
    default:
      throw new Error()
  }
}

const apiResponseToAction = type => payload => ({
  type,
  payload,
})

const serializedTokenToToken = serializedToken => ({
  ...parseJwt(serializedToken),
  serializedToken,
})
