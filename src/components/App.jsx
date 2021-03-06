import React from 'react'
import { ToastContainer } from 'react-toastify'

import { Router } from 'components/Router'
import { UnhandledApiClientErrors } from 'components/UnhandledApiClientErrors'
import { ApiEnvironmentProvider } from 'providers/ApiEnvironmentProvider'
import { ApiProvider } from 'providers/ApiProvider'
import { SessionProvider } from 'providers/SessionProvider'

export const App = () => {
  return (
    <UnhandledApiClientErrors>
      <SessionProvider>
        <ApiEnvironmentProvider>
          <ApiProvider>
            <ToastContainer />
            <Router />
          </ApiProvider>
        </ApiEnvironmentProvider>
      </SessionProvider>
    </UnhandledApiClientErrors>
  )
}
