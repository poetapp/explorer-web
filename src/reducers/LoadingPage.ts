import { Actions } from 'actions/index'

const defaultState = {
  loading: false,
  percentage: -1,
}

export const loadingPage = (state: any, action: any) => {
  switch (action.type) {
    case Actions.LoadingPage.LOADING_ON:
      return {
        ...state,
        loading: true,
        percentage: 10,
      }
    case Actions.LoadingPage.LOADING_FULL:
      return {
        ...state,
        loading: true,
        percentage: 100,
      }
    case Actions.LoadingPage.LOADING_OFF:
      return {
        ...state,
        loading: false,
        percentage: -1,
      }
    default:
      return defaultState
  }
}
