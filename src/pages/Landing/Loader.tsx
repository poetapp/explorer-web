import * as React from 'react';
import { Route } from 'react-router';
import { Action } from 'redux';

import Constants from '../../constants';
import PageLoader, { ReducerDescription } from '../../components/PageLoader';
import { LandingLayout } from './Layout';

export class Landing extends PageLoader<Object, Object> {

  component = LandingLayout;

  initialState(): Object {
    return {};
  }

  routeHook(key: string) {
    return [<Route path="/" key={key} component={this.container()}/>]
  }

  reducerHook<State>(): ReducerDescription<Object> {
    return {
      subState: 'Landing',
      reducer: (state: Object, action: Action) => {
        return state || this.initialState();
      }
    }
  }

  sagaHook(): any {
    return null;
  }

  select(state: any, ownProps: any): Object {
    return { loggedIn: state.session && state.session.state === Constants.LOGGED_IN };
  }

  mapDispatchToProps(): any {
    return {}
  }
}
