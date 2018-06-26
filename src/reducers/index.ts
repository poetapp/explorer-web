import { fetchReducer } from './FetchReducer'
import { loadingPage } from './LoadingPage.reducer'
import { signIn } from './SignIn.reducer'

export default {
  fetch: fetchReducer,
  signIn,
  loadingPage,
}
