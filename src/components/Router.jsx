import * as React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { Home } from 'components/pages/home'
import { WorkById } from 'components/routes/work'
import { Works } from 'components/routes/works'
import { IssuerById } from 'components/routes/issuer'
import { Login } from 'components/routes/Login'

import { SessionContext } from 'providers/SessionProvider'
import {useContext} from 'react'

export const Router = () => {
  const [token] = useContext(SessionContext)

  return (
    <BrowserRouter>
      <Switch>
        { token && <Redirect from='/login' to='/'/> }
        <Route exact path="/" component={Home} />
        <Route exact path="/works" component={Works} />
        <Route path="/works/:id" component={WorkById} />
        <Route path="/issuers/:id" component={IssuerById} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  )
}
