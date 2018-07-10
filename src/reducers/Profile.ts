import { Actions } from 'actions/index'

export const defaultState = {
  error: {
    status: false,
    message: '',
  },
  loading: false,
}

export const profile = (state: any = defaultState, action: any = {}) => {
  switch (action.type) {
    case Actions.Profile.PROFILE:
      return {
        ...state,
        error: {
          status: false,
          message: '',
        },
        loading: true,
      }
    case Actions.Profile.PROFILE_SUCCESS:
      return {
        ...state,
        error: {
          status: false,
          message: '',
        },
        loading: false,
      }
    case Actions.Profile.PROFILE_ERROR:
      return {
        ...state,
        error: {
          status: true,
          message: action.payload,
        },
        loading: false,
      }
    case Actions.Profile.PROFILE_CLEAR_ERROR:
      return {
        ...state,
        error: {
          status: false,
          message: '',
        },
        loading: false,
      }
    default:
      return state
  }
}
