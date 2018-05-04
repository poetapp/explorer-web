import * as React from 'react'
import { Route } from 'react-router'

import PageLoader, { ReducerDescription } from 'components/PageLoader'
import { LandingLayout } from './Layout'

export class Landing extends PageLoader<object, object> {
  component = LandingLayout

  initialState(): object {
    return {}
  }

  routeHook(key: string) {
    return [<Route path="/" key={key} component={this.container()} />]
  }

  reducerHook(): ReducerDescription<any> {
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
