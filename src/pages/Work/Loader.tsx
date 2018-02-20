import * as React from 'react';
import { Route } from 'react-router';

import PageLoader, { ReducerDescription } from 'components/PageLoader'
import { WorkLayout } from './Layout'

interface WorkState {
}

export class Work extends PageLoader<WorkState, Object> {

  component = WorkLayout;

  initialState() {
    return {};
  }

  routeHook(key: string) {
    return [<Route path="/works/:id" key={key} component={this.container()} />]
  }

  reducerHook<State>(): ReducerDescription<WorkState> {
    return null;
  }

  sagaHook(): any {
    return null;
  }

  select(state: any, ownProps: any): Object {
    return { id: ownProps.params.id };
  }

  mapDispatchToProps() {
    return {}
  }
}
