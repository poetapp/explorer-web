import * as React from 'react'
import { render} from 'react-dom'

import './index.scss'

import { App } from 'components/App'

const reactRoot = document.getElementById('react-root');

render(<App/>, reactRoot)