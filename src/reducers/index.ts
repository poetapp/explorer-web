import { fetchReducer } from './FetchReducer'
import { loadingPage } from './LoadingPage'
import { profile } from './Profile'
import { signIn } from './SignIn'
import { user } from './User'
export default {
  fetch: fetchReducer,
  signIn,
  user,
  loadingPage,
  profile,
}
