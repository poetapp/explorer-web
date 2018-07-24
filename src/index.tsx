import { FeatureToggles, getCurrentActiveFeatures, Feature, isActive } from '@paralleldrive/react-feature-toggles'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { initialFeatures, FeatureName } from 'config/features'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'

import { Layout } from 'components/Root'
import { createPoetStore } from 'store'

async function init(): Promise<void> {
  const { store, pages } = await createPoetStore()
  const routes = pages
    .map((page: any, index: any) => page.routeHook('' + index))
    .reduce((a: any, b: any) => a.concat(b), [])

  function handlerRoutes(store: any, pathname: string): void {
    const state = store.getState()
    const { user } = state
    const omitRoutes: ReadonlyArray<any> = ['/', '/login', '/register']
    const worksNoAuth = [pathname].filter(x => typeof x === 'string' && x.indexOf('/works') > -1)
    const notNeedOauth = omitRoutes.includes(pathname) || worksNoAuth.length
    const userIsAuthenticated = !!user.token
    if (['/login', '/login/'].includes(pathname) && userIsAuthenticated) browserHistory.push('/')

    if (!notNeedOauth && !userIsAuthenticated) browserHistory.push('/login')
  }
  function requireAuth(store: any): (route: any, replace: object) => void {
    return (route: any, replace: object): void => {
      const pathname = route.location.pathname
      handlerRoutes(store, pathname)
    }
  }

  function onChange(store: any): (route: any, replace: object) => void {
    return (route: any, replace: any): void => {
      const pathname = replace.location.pathname
      handlerRoutes(store, pathname)
    }
  }

  function notFound(route: any, replace: object): void {
    browserHistory.push('/')
  }
  ReactDOM.render(
    <Provider store={store}>
      <FeatureToggles features={getCurrentActiveFeatures({ initialFeatures })}>
        <Feature>
          {({ features }) =>
            isActive(FeatureName.Auth, features) ? (
              <Router history={browserHistory}>
                <Route component={Layout} onEnter={requireAuth(store)} onChange={onChange(store)}>
                  {routes}
                </Route>
                <Route path="*" onEnter={notFound} />
              </Router>
            ) : (
              <Router history={browserHistory}>
                <Route component={Layout}>{routes}</Route>
                <Route path="*" onEnter={notFound} />
              </Router>
            )
          }
        </Feature>
      </FeatureToggles>
    </Provider>,
    document.getElementById('app')
  )
}

init().catch(console.error)
