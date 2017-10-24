import * as React from 'react';
import { Route } from 'react-router';

import PageLoader, { ReducerDescription } from '../../../components/PageLoader';
import { DeveloperLayout } from './Layout';

export class Developer extends PageLoader<undefined, Object> {

  component = DeveloperLayout;

  initialState(): undefined {
    return undefined;
  }

  routeHook(key: string) {
    return [<Route path="/documentation/developer" key={key} component={this.container()} />]
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
