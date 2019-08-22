import { pipe } from 'ramda'
import React, { useContext } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { Home } from 'components/pages/Home'
import { WorkById } from 'components/pages/Work'
import { Works } from 'components/pages/Works'
import { IssuerById } from 'components/pages/Issuer'
import { Login } from 'components/pages/Login'
import { SignUp } from 'components/pages/SignUp'
import { ForgotPassword } from 'components/pages/ForgotPassword'
import { ChangePasswordWithToken } from 'components/pages/ChangePasswordWithToken'
import { ConfirmMail } from 'components/pages/ConfirmMail'
import { Tokens } from 'components/pages/Tokens'
import { TermsOfService } from 'components/pages/TermsOfService'
import { NewClaim } from 'components/pages/NewClaim'
import { Settings } from 'components/pages/Settings'

import { SessionContext } from 'providers/SessionProvider'

export const Router = () => {
  const [account] = useContext(SessionContext)

  return (
    <BrowserRouter>
      <Switch>
        { account?.id && <Redirect from='/login' to='/'/> }
        { account && <Redirect from='/signup' to='/'/> }
        { !account && <Redirect from='/tokens' to='/login'/> }
        { !account && <Redirect from='/new-claim' to='/login'/> }
        { !account && <Redirect from='/settings' to='/login'/> }
        <Route exact path="/" component={Home} />
        <Route exact path="/works" component={Works} />
        <Route path="/works/:id" render={({ match }) => <WorkById id={match.params.id} />} />
        <Route path="/issuers/:id" render={({ match }) => <IssuerById id={match.params.id} />} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/change-password" render={pipe(getQueryToken, token => <ChangePasswordWithToken token={token}/>)} />
        <Route path="/confirm-email" render={pipe(getQueryToken, token => <ConfirmMail token={token}/>)} />
        <Route path="/tokens" component={Tokens} />
        <Route path="/tos" component={TermsOfService} />
        <Route path="/new-claim" component={pipe(getQueryAbout, about => <NewClaim about={about}/>)} />
        <Route path="/settings" component={Settings} />
      </Switch>
    </BrowserRouter>
  )
}

const getQueryToken = ({ location }) => (new URLSearchParams(location.search)).get('token')
const getQueryAbout = ({ location }) => (new URLSearchParams(location.search)).get('about')
