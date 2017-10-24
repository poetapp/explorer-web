import * as React from 'react';
import { Route } from 'react-router';

import PageLoader, { ReducerDescription } from '../../../components/PageLoader';
import { AboutLayout } from './Layout';

export class About extends PageLoader<undefined, Object> {

  component = AboutLayout;

  initialState(): null {
    return null;
  }

  routeHook(key: string) {
    return [<Route path="/network/about" key={key} component={this.container()} />]
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
}
