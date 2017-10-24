import * as React from 'react';
import { Route } from 'react-router';

import PageLoader, { ReducerDescription } from '../../../components/PageLoader';
import { FeaturesLayout } from './Layout';

export class Features extends PageLoader<undefined, Object> {

  component = FeaturesLayout;

  initialState(): null {
    return null;
  }

  routeHook(key: string) {
    return [<Route path="/network/features" key={key} component={this.container()} />]
  }

  reducerHook<State>(): ReducerDescription<undefined> {
    return null;
  }

  sagaHook(): any {
    return null;
  }

  select(state: any, ownProps: any): Object {
    return {};
  }

  mapDispatchToProps(): Object {
    return null;
  }
}
