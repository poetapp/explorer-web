import moment from 'moment'
import React from 'react'

import classNames from './Tokens.scss'

export const Tokens = ({ tokens }) => {
  return (
    <section className={classNames.tokens}>
      <h1>API Tokens</h1>
      <h2>Manage your API Tokens by authenticating with the Frost API</h2>
      <TokenTable tokens={tokens} />
    </section>
  )
}

const TokenTable = ({ tokens }) => (
  <table>
    <thead>
      <tr>
        <td>#</td>
        <td>Token</td>
        <td>Creation</td>
        <td>Expiry</td>
      </tr>
    </thead>
    <tbody>
      {
        tokens?.map(token =>
          <TokenTableRow token={token} key={token.serializedToken} />
        )
      }
    </tbody>
  </table>
)

const TokenTableRow = ({ token }) => {
  const firstAndLastCharacters = (s, n) => s.slice(0, n) + '...' + s.slice(-n)
  const formatDate = date => moment.unix(date).format('DD/MM/YY')

  const formattedIat = formatDate(token.iat)
  const formattedSerializedToken = firstAndLastCharacters(token.serializedToken, 20)

  return (
    <tr>
      <td>1</td>
      <td>{formattedSerializedToken}</td>
      <td>{formattedIat}</td>
      <td>Never</td>
    </tr>
  )
}