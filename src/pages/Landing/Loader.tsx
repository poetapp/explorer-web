import * as React from 'react'
import { Route } from 'react-router'

import PageLoader, { ReducerDescription } from 'components/PageLoader'
import { LandingLayout } from './Layout'

export class Landing extends PageLoader<Object, Object> {

  component = LandingLayout;

  initialState(): Object {
    return {};
  }

  routeHook(key: string) {
    return [<Route path="/" key={key} component={this.container()}/>]
  }

  reducerHook<State>(): ReducerDescription<Object> {
    return null
  }

  sagaHook(): any {
    return null;
  }

  select(state: any, ownProps: any): Object {
    return { }
  }

  mapDispatchToProps(): any {
    return { }
  }
}
