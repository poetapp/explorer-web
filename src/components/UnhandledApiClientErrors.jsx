import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

import { ApiClientError } from 'helpers/ApiClient'

export const UnhandledApiClientErrors = ({ children }) => {
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
