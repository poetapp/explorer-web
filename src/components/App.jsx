import React from 'react'

import { ToastContainer } from 'react-toastify'
import { Router } from 'components/Router'
import { SessionProvider } from 'providers/SessionProvider'

import { ApiProvider } from 'providers/ApiProvider'
import { ApiEnvironmentProvider } from 'providers/ApiEnvironmentProvider'

export const App = () => {
  return (
    <SessionProvider>
      <ApiEnvironmentProvider>
        <ApiProvider>
          <ToastContainer />
          <Router />
        </ApiProvider>
      </ApiEnvironmentProvider>
    </SessionProvider>
  )
}
