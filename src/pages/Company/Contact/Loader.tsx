import * as React from 'react';
import { Route } from 'react-router';

import PageLoader, { ReducerDescription } from '../../../components/PageLoader';
import { ContactLayout } from './Layout';

export class Contact extends PageLoader<undefined, Object> {

  component = ContactLayout;

  initialState(): undefined {
    return undefined;
  }

  routeHook(key: string) {
    return [<Route path="/company/contact" key={key} component={this.container()} />]
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
