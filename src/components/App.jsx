import React from 'react'

import { Router } from 'components/Router'
import { SessionProvider } from 'providers/SessionProvider'

export const App = () => (
  <SessionProvider>
    <Router />
  </SessionProvider>
)