import { Actions } from 'actions/index'

const defaultState = {
  error: {
    status: false,
    message: '',
  },
  loading: false,
}

export const signUp = (state: any, action: any) => {
  switch (action.type) {
    case Actions.SignUp.SIGN_UP:
      return {
        ...state,
        error: {
          status: false,
          message: '',
        },
        loading: true,
      }
    case Actions.SignUp.SIGN_UP_SUCCESS:
      return {
        ...state,
        error: {
          status: false,
          message: '',
        },
        loading: false,
      }
    case Actions.SignUp.SIGN_UP_ERROR:
      return {
        ...state,
        error: {
          status: true,
          message: action.payload,
        },
        loading: false,
      }
    case Actions.SignUp.SIGN_UP_CLEAR_ERROR:
      return {
        ...state,
        error: {
          status: false,
          message: '',
        },
        loading: false,
      }
    default:
      return {
        defaultState,
      }
  }
}
