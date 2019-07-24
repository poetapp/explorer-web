import moment from 'moment'
import React, { useContext, useEffect, useReducer, useState, useRef } from 'react'

import { Main } from 'components/templates/Main'
import { parseJwt } from 'helpers/jwt'
import { ApiContext } from 'providers/ApiProvider'

import classNames from './Tokens.scss'

export const Tokens = () => {
  const { api, isBusy } = useContext(ApiContext)
  const [tokens, dispatch] = useReducer(tokenReducer, [])

  useEffect(() => {
    if (api)
      api.getTokens().then(apiResponseToAction('get')).then(dispatch)
  }, [api])

  const onCreateToken = () =>
    api.createToken().then(apiResponseToAction('create')).then(dispatch)

  const onDelete = token =>
    api.deleteToken(token).then(_ => token).then(apiResponseToAction('delete')).then(dispatch)

  return (
    <Main>
      <section className={classNames.tokens}>
        <h1>API Tokens</h1>
        <h2>Manage your API Tokens by authenticating with the Frost API</h2>
        <TokenTable tokens={tokens} onDelete={onDelete} />
        <button className={classNames.create} onClick={onCreateToken} disabled={isBusy}>Create API Token</button>
      </section>
    </Main>
  )
}

const tokenReducer = (tokens, { type, payload }) => {
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

const TokenTable = ({ tokens, onDelete }) => (
  <table>
    <thead>
    <tr>
      <td>#</td>
      <td>Token</td>
      <td>Creation</td>
      <td>Expiry</td>
      <td>Actions</td>
    </tr>
    </thead>
    <tbody>
    {
      tokens?.map((token, index) =>
        <TokenTableRow token={token} key={token.serializedToken} index={index + 1} onDelete={() => onDelete(token.serializedToken)} />
      )
    }
    </tbody>
  </table>
)

const TokenTableRow = ({ token, index, onDelete }) => {
  const formattedIat = moment.unix(token.iat).format('L')
  const formattedIatISO = moment.unix(token.iat).format()
  const copy = useRef()
  const [copied, setCopied] = useState(false)

  const onCopy = () => {
    copy.current?.select()
    document.execCommand('copy')
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <tr>
      <td>{index}</td>
      <td className={classNames.copy}>
        <input type="text" value={token.serializedToken} readOnly ref={copy}/>
        <button onClick={onCopy}>{!copied ? 'Copy' : 'Copied!'}</button>
      </td>
      <td title={formattedIatISO}>{formattedIat}</td>
      <td>Never</td>
      <td><button className={classNames.delete} onClick={onDelete}>Remove</button></td>
    </tr>
  )
}
