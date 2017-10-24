import * as React from 'react';
import { Route } from 'react-router';

import { currentPublicKey } from '../../selectors/session';
import PageLoader, { ReducerDescription } from '../../components/PageLoader';
import { ProfileLayout, ProfileLayoutProps } from './Layout';

interface ProfileState {
}

export class Profile extends PageLoader<ProfileState, Object> {

  component = ProfileLayout;

  initialState() {
    return {};
  }

  routeHook(key: string) {
    return [<Route path="/profiles/:id" key={key} component={this.container()} />]
  }

  reducerHook<State>(): ReducerDescription<ProfileState> {
    return null;
  }

  sagaHook(): any {
    return null;
  }

  select(state: any, ownProps: any): ProfileLayoutProps {
    return {
      id: ownProps.params.id,
      sessionPublicKey: currentPublicKey(state)
    };
  }
}
