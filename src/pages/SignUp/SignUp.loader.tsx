import * as React from 'react'
import { Route } from 'react-router'

import PageLoader, { ReducerDescription } from 'components/PageLoader'

import { SignUpLayout } from './SignUp.layout'

export class SignUp extends PageLoader<any, object> {
  readonly component = SignUpLayout

  initialState(): object {
    return {}
  }

  routeHook(key: string): JSX.Element[] {
    return [<Route path="/register" key={key} component={this.container()} />]
  }

  reducerHook<State>(): ReducerDescription<State> {
    return null
  }

  sagaHook(): any {
    return null
  }

  select(state: any, ownProps: any): object {
    return {}
  }

  mapDispatchToProps(): any {
    return {}
  }
}
