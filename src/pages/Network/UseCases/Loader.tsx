import * as React from 'react';
import { Route } from 'react-router';

import PageLoader, { ReducerDescription } from '../../../components/PageLoader';
import { UseCasesLayout } from './Layout';

export class UseCases extends PageLoader<undefined, Object> {

  component = UseCasesLayout;

  initialState(): null {
    return null;
  }

  routeHook(key: string) {
    return [<Route path="/network/use-cases" key={key} component={this.container()} />]
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
