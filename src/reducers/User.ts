import { Actions } from 'actions/index'
const { REHYDRATE } = require('redux-persist/constants')

export const defaultState = {
  token: '',
  profile: {
    email: '',
    apiTokens: new Array(),
    verified: false,
    createdAt: '',
  },
}

export const user = (state: any = defaultState, action: any = {}) => {
  switch (action.type) {
    case Actions.SignIn.SIGN_IN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        ...{ profile: { ...defaultState.profile, ...action.payload.profile } },
      }
    case Actions.SignUp.SIGN_UP_SUCCESS:
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
    case REHYDRATE:
      return {
        ...state,
        ...action.payload.user,
      }
    default:
      return state
  }
}
