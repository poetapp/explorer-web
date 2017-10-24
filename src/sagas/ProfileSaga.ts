import { Action } from 'redux'
import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { Api, Headers } from 'poet-js'

import { Configuration } from '../configuration'
import { Actions } from '../actions/index'

interface FetchProfileAction extends Action {
  readonly profilePublicKey: string;
}

export function profileSaga() {
  return function*() {
    yield takeEvery(Actions.Profile.FetchProfile, fetchProfile);
  }
}

function* fetchProfile(action: FetchProfileAction) {
  const profileResponse = yield call(fetch, Configuration.api.explorer + Api.Profiles.url(action.profilePublicKey));
  if (profileResponse.status === 200) {
    const profile = yield profileResponse.json();
    yield put({ type: Actions.Profile.ProfileFetched, profile });
  }

  const notificationsResponse = yield call(fetch, Configuration.api.explorer + Api.Notifications.url(action.profilePublicKey));
  if (notificationsResponse.status === 200) {
    const unreadCount = parseInt(notificationsResponse.headers.get(Headers.Unread));
    const totalCount = parseInt(notificationsResponse.headers.get(Headers.TotalCount));
    const notifications = yield notificationsResponse.json();
    yield put({ type: Actions.Profile.NotificationsUpdate, payload: { notifications, unreadCount, totalCount } });
  }
}
