import * as React from 'react'
import { render} from 'react-dom'
import 'react-toastify/dist/ReactToastify.css'

import { ApiClient } from 'helpers/ApiClient'
import { FrostApi } from 'apis/frost'

import './index.scss'

import { App } from 'components/App'

const reactRoot = document.getElementById('react-root');

render(<App/>, reactRoot)

console.log(ApiClient(FrostApi('', '')))
