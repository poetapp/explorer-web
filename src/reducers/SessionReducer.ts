import { Actions } from '../actions/index';
import Constants from '../constants';

export function sessionReducer(state: any, action: any) {
  if (action.type) {
    switch (action.type) {
      case Actions.Session.LoginSuccess:
        return {
          state: Constants.LOGGED_IN,
          token: action.token
        };
      case Actions.Session.LogoutRequested:
        return {
          state: Constants.NO_SESSION
        };
      case Actions.Session.LoginIdReceived:
        return {
          state: Constants.WAITING_SIGNATURE,
          requestId: action.payload.id
        };
    }
  }
  return state || { state: Constants.NO_SESSION };
}