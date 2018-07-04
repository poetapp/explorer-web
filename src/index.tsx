import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { FeatureToggles, getBrowserQueryFeatures } from '@paralleldrive/react-feature-toggles'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { Layout } from './components/Root'
import { createPoetStore } from './store'

const { store, pages } = createPoetStore()

const routes = pages.map((page, index) => page.routeHook('' + index)).reduce((a, b) => a.concat(b), [])

ReactDOM.render(
  <Provider store={store}>
    <FeatureToggles features={getBrowserQueryFeatures()}>
      <Router history={browserHistory}>
        <Route component={Layout}>{routes}</Route>
      </Router>
    </FeatureToggles>
  </Provider>,
  document.getElementById('app')
)
