import * as React from 'react'
import { render} from 'react-dom'
import 'react-toastify/dist/ReactToastify.css'

import './index.scss'

import { App } from 'components/App'
import {toast} from 'react-toastify'
import {ApiClientError} from './helpers/ApiClient'

const reactRoot = document.getElementById('react-root');

window.addEventListener('unhandledrejection', function (event) {
  if (event.reason instanceof ApiClientError) {
    console.log('unhandled ApiClientError', event.reason, event.reason.serverResponse)
    event.preventDefault()
    toast.error(event.reason.serverResponse.body)
  }
});

render(<App/>, reactRoot)
