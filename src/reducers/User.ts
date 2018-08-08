import { Actions } from 'actions'
const { REHYDRATE } = require('redux-persist/constants')
import { Images } from 'images/Images'

export const defaultState = {
  token: '',
  profile: {
    email: '',
    apiTokens: new Array(),
    verified: false,
    createdAt: '',
    avatar: Images.Avatar,
  },
}

export const user = (state: any, action: any) => {
  switch (action.type) {
    case Actions.SignIn.SIGN_IN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        ...{ profile: { ...defaultState.profile, ...action.payload.profile } },
      }
    case Actions.Profile.PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload,
        },
      }
    case Actions.SetTokenLogin.SET_TOKEN_LOGIN:
      return {
        ...state,
        user: {
          ...state.user,
          token: action.payload.token,
        },
      }
    case Actions.SignOut.SIGN_OUT:
      return defaultState
    case REHYDRATE:
      return {
        ...state,
        ...action.payload.user,
      }
  }
  return state || defaultState
}
