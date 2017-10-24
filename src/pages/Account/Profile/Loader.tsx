import * as React from 'react';
import { Route } from 'react-router';
import { delay, takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { Claim } from 'poet-js';

import { Actions } from '../../../actions/index'
import PageLoader, { ReducerDescription } from '../../../components/PageLoader';

import { ProfileLayout, UserProfileProps } from './Layout';

export class Profile extends PageLoader<UserProfileProps, Object> {

  component = ProfileLayout;

  initialState() {
    return {};
  }

  routeHook(key: string) {
    return [<Route path="/account/profile" key={key} component={this.container()} />]
  }

  reducerHook<State>(): ReducerDescription<null> {
    return null;
  }

  sagaHook() {
    function* updateProfile() {
      yield put({ type: Actions.Profile.Updating });
      yield delay(2000);
      yield put({ type: Actions.Profile.Updated });
    }
    return function*() {
      yield takeEvery(Actions.Profile.UpdateRequested, updateProfile);
    };
  }

  select(state: any, ownProps: any): Object {
    const { displayName = '', name = '', bio = '', url = '', email = '', location = '', imageData = '' } = state.profile && state.profile.attributes || {};

    return {
      id: ownProps.params.id,
      displayName,
      name,
      bio,
      url,
      email,
      location,
      imageData
    };
  }

  mapDispatchToProps(): Object {
    return {
      submitProfileRequested: (payload: Claim) => ({
        type: Actions.Claims.SubmitRequested, payload: [payload]
      })
    };
  }
}
