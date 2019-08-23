import * as React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

const RouterContext = React.createContext(null);

export const BrowserRouterProvider = ({ children }) => (
  <BrowserRouter>
    <Route>
      {(routeProps) => (
        <RouterContext.Provider value={routeProps}>
          {children}
        </RouterContext.Provider>
      )}
    </Route>
  </BrowserRouter>
);

export const useBrowserRouterContext = () => React.useContext(RouterContext)
