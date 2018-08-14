import * as React from 'react'
import { Route } from 'react-router'

import { Actions } from 'actions'
import PageLoader, { ReducerDescription } from 'components/PageLoader'
import { WorksLayout } from './Layout'

export class Works extends PageLoader<any, object> {
  component = WorksLayout

  initialState() {
    return {}
  }

  routeHook(key: string) {
    return [<Route path="/works" key={key} component={this.container()} />]
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

  mapDispatchToProps() {
    return {
      dispatchSearchOffsetChangeAction: (offset: number) => ({
        type: Actions.Search.SEARCH_OFFSET,
        offset,
      }),
    }
  }
}
