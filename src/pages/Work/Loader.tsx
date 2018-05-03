import * as React from 'react'
import { Route } from 'react-router'

import PageLoader, { ReducerDescription } from 'components/PageLoader'
import { WorkLayout } from './Layout'

export class Work extends PageLoader<any, object> {
  component = WorkLayout

  initialState() {
    return {}
  }

  routeHook(key: string) {
    return [<Route path="/works/:id" key={key} component={this.container()} />]
  }

  reducerHook(): ReducerDescription<any> {
    return null
  }

  sagaHook(): any {
    return null
  }

  select(state: any, ownProps: any): object {
    return { workId: ownProps.params.id }
  }

  mapDispatchToProps() {
    return {}
  }
}
