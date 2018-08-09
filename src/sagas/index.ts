import { CacheInvalidationSaga } from './CacheInvalidationSaga'
import { fetchSaga } from './FetchSaga'
import { GetProfileSaga } from './GetProfile'
import { workSearchSaga } from './NavbarSaga'
import { SignInSaga } from './SignIn'
import { SignOutSaga } from './SignOut'
import { SignUpSaga } from './SignUp'

export default [SignUpSaga, SignOutSaga, SignInSaga, GetProfileSaga, fetchSaga, workSearchSaga, CacheInvalidationSaga]
