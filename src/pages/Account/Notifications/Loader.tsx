import * as React from 'react';
import { Route } from 'react-router';
import { Api } from 'poet-js'

import PageLoader, { ReducerDescription } from '../../../components/PageLoader';
import { NotificationsStore, PoetAppState } from '../../../store/PoetAppState';
import { Actions } from '../../../actions/index';
import { NotificationsActions, NotificationsLayout } from './Layout';
import { currentPublicKey } from '../../../selectors/session';

export class NotificationsPage extends PageLoader<NotificationsStore, Object> {

  component = NotificationsLayout;

  initialState(): NotificationsStore {
    return {
      notifications: [] as ReadonlyArray<Api.Notifications.Resource>,
      unreadCount: 0,
      totalCount: 0
    };
  }

  routeHook(key: string) {
    return [<Route path="/account/notifications" key={key} component={this.container()} />]
  }

  reducerHook<State>(): ReducerDescription<null> {
    return null;
  }

  sagaHook(): any {
    return null
  }

  select(state: PoetAppState): Object {
    return {
      sessionPublicKey: currentPublicKey(state)
    }
  }

  mapDispatchToProps(): NotificationsActions {
    return {
      markRead: (notifications: ReadonlyArray<number>) => ({ type: Actions.Notifications.MarkAllAsRead, notifications })
    }
  }
}
