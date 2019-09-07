import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

import { ApiClientError } from 'helpers/ApiClient'

export const UnhandledApiClientErrors = ({ children }) => {
  // Note: this is pretty much unsupported by all browsers right now.
  // See https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event.
  useEffect(() => {
    const onUnhandledRejection = event => {
      if (event.reason instanceof ApiClientError) {
        console.log('unhandled ApiClientError', event.reason, event.reason.serverResponse)
        event.preventDefault()
        toast.error(event.reason.serverResponse.body)
      }
    }
    window.addEventListener('unhandledrejection', onUnhandledRejection)
    return () => window.removeEventListener('unhandledrejection', onUnhandledRejection)
  }, [])

  return children
}
