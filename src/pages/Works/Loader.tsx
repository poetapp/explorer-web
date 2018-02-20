import * as React from 'react';
import { Route } from 'react-router';

import { Actions } from '../../actions/index';
import PageLoader, { ReducerDescription } from '../../components/PageLoader';
import { WorksLayout } from './Layout';

export class Works extends PageLoader<any, Object> {

  component = WorksLayout;

  initialState() {
    return {};
  }

  routeHook(key: string) {
    return [<Route path="/works" key={key} component={this.container()} />]
  }

  reducerHook<State>(): ReducerDescription<any> {
    return null;
  }

  sagaHook(): any {
    return null;
  }

  select(state: any, ownProps: any): Object {
    return {};
  }

  mapDispatchToProps() {
    return {
      dispatchSearchOffsetChangeAction: (offset: number) => ({ type: Actions.Search.Offset, offset })
    }
  }
}
