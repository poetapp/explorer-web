import React, { useContext } from 'react'

import { Main } from 'components/templates/Main'
import { SessionContext } from 'providers/SessionProvider'
import {useTokens} from '../../hooks/useTokens'


export const Tokens = () => {
  const [account] = useContext(SessionContext)
  const [tokens, error] = useTokens(account?.token)

  return (
    <Main>
      <ul>
        {
          tokens?.map(token =>
            <li key={token}>{token}</li>
          )
        }
      </ul>
    </Main>
  )
}
