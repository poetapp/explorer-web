import { fetchReducer } from './FetchReducer'
import { loadingPage } from './LoadingPage.reducer'
import { profile } from './Profile.reducer';
import { signIn } from './SignIn.reducer'
import { user } from './User.reducer'
export default {
  fetch: fetchReducer,
  signIn,
  user,
  loadingPage,
  profile,
};
