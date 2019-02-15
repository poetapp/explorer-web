import React, { useContext } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { Home } from 'components/pages/Home'
import { WorkById } from 'components/routes/Work'
import { Works } from 'components/routes/Works'
import { IssuerById } from 'components/routes/Issuer'
import { Login } from 'components/routes/Login'
import { SignUp } from 'components/routes/SignUp'
import { ConfirmMail } from 'components/routes/ConfirmMail'
import { Tokens } from 'components/routes/Tokens'

import { SessionContext } from 'providers/SessionProvider'

export const Router = () => {
  const [token] = useContext(SessionContext)

  return (
    <BrowserRouter>
      <Switch>
        { token && <Redirect from='/login' to='/'/> }
        { token && <Redirect from='/signup' to='/'/> }
        { !token && <Redirect from='/tokens' to='/login'/> }
        <Route exact path="/" component={Home} />
        <Route exact path="/works" component={Works} />
        <Route path="/works/:id" component={WorkById} />
        <Route path="/issuers/:id" component={IssuerById} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/confirm-mail" component={ConfirmMail} />
        <Route path="/tokens" component={Tokens} />
      </Switch>
    </BrowserRouter>
  )
}
