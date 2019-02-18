import React from 'react'

import { Router } from 'components/Router'
import { SessionProvider } from 'providers/SessionProvider'
import { ApiProvider } from 'providers/ApiProvider'

export const App = () => (
  <SessionProvider>
    <ApiProvider>
      <Router />
    </ApiProvider>
  </SessionProvider>
)