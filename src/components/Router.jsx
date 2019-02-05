import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home } from 'components/pages/home'
import { WorkById } from 'components/routes/work'
import { Works } from 'components/routes/works'
import { IssuerById } from 'components/routes/issuer'
import { Login } from 'components/routes/Login'

export const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/works" component={Works} />
      <Route path="/works/:id" component={WorkById} />
      <Route path="/issuers/:id" component={IssuerById} />
      <Route path="/login" component={Login} />
    </Switch>
  </BrowserRouter>
)
