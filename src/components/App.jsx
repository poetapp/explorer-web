import React from 'react'
import { ToastContainer } from 'react-toastify'

import { Router } from 'components/Router'
import { SessionProvider } from 'providers/SessionProvider'
import { ApiProvider } from 'providers/ApiProvider'

export const App = () => (
  <SessionProvider>
    <ApiProvider>
      <ToastContainer />
      <Router />
    </ApiProvider>
  </SessionProvider>
)