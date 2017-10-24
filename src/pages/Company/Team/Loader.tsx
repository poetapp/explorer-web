import * as React from 'react';
import { Route } from 'react-router';

import PageLoader, { ReducerDescription } from '../../../components/PageLoader';
import { TeamLayout } from './Layout';

export class Team extends PageLoader<undefined, Object> {

  component = TeamLayout;

  initialState(): undefined {
    return undefined;
  }

  routeHook(key: string) {
    return [<Route path="/company/team" key={key} component={this.container()} />]
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
