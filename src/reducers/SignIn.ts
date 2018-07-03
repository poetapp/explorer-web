import { Actions } from 'actions/index'

const defaultState = {
  error: {
    status: false,
    message: '',
  },
  loading: false,
}

export const signIn = (state: any, action: any) => {
  switch (action.type) {
    case Actions.SignIn.SIGN_IN:
      return {
        ...state,
        error: {
          status: false,
          message: '',
        },
        loading: true,
      }
    case Actions.SignIn.SIGN_IN_SUCCESS:
      return {
        ...state,
        error: {
          status: false,
          message: '',
        },
        loading: false,
      }
    case Actions.SignIn.SIGN_IN_ERROR:
      return {
        ...state,
        error: {
          status: true,
          message: action.payload,
        },
        loading: false,
      }
    case Actions.SignIn.SIGN_IN_CLEAR_ERROR:
      return {
        ...state,
        error: {
          status: false,
          message: '',
        },
        loading: false,
      }
  }
  return state || defaultState
}
