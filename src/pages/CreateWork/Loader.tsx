import * as React from 'react';
import { Route } from 'react-router';

import PageLoader, { ReducerDescription } from '../../components/PageLoader';
import { Actions } from '../../actions/index'
import { currentPublicKey } from '../../selectors/session'
import { PoetAppState } from '../../store/PoetAppState'
import { CreateWorkActions, CreateWorkLayout, CreateWorkProps } from './Layout'

const EditWorkByIdUrl = '/works/:id/edit';
const CreateWorkUrl = '/create-work';

interface CreateWorkState {
}

export class CreateWork extends PageLoader<CreateWorkState, Object> {

  component = CreateWorkLayout;

  initialState() {
    return {};
  }

  routeHook(key: string) {
    return [
      <Route path={CreateWorkUrl} key={key} component={this.container()} />,
      <Route path={EditWorkByIdUrl} key={key} component={this.container()} />
    ]
  }

  reducerHook<State>(): ReducerDescription<CreateWorkState> {
    return null;
  }

  sagaHook(): any {
    return null;
  }

  select(state: PoetAppState, ownProps: CreateWorkProps & {route: {path: string}, params: {id: string}}): CreateWorkProps {
    return {
      userPublicKey: currentPublicKey(state),
      mode: ownProps.route.path === EditWorkByIdUrl ? 'edit' : 'create',
      workId: ownProps.params.id
    };
  }

  mapDispatchToProps(): CreateWorkActions {
    return {
      createWorkRequested: (payload: any[]) => ({
        type: Actions.Claims.SubmitRequested, payload
      })
    };
  }
}
