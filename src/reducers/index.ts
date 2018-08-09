import { fetchReducer } from './FetchReducer'
import { loadingPage } from './LoadingPage'
import { profile } from './Profile'
import { signIn } from './SignIn'
import { signUp } from './SignUp'
import { user } from './User'
export default {
  fetch: fetchReducer,
  signUp,
  signIn,
  user,
  loadingPage,
  profile,
}
