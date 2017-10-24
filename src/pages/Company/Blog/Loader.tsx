import * as React from 'react';
import { Route } from 'react-router';

import PageLoader, { ReducerDescription } from '../../../components/PageLoader';
import { BlogLayout } from './Layout';

export class Blog extends PageLoader<undefined, Object> {

  component = BlogLayout;

  initialState(): undefined {
    return undefined;
  }

  routeHook(key: string) {
    return [<Route path="/company/blog" key={key} component={this.container()} />]
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
