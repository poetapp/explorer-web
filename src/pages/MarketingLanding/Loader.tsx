import * as React from 'react';
import { Route } from 'react-router';

import PageLoader, { ReducerDescription } from '../../components/PageLoader';
import { Layout } from './Layout';

export class MarketingLanding extends PageLoader<Object, Object> {

  component = Layout;

  initialState(): Object {
    return {};
  }

  routeHook(key: string) {
    return [<Route path="/marketing-landing" key={key} component={this.container()}/>]
  }

  reducerHook<State>(): ReducerDescription<Object> {
    return null;
  }

  sagaHook(): any {
    return null;
  }

  select(state: any, ownProps: any): Object {
    return {};
  }

  mapDispatchToProps(): any {
    return null;
  }
}
