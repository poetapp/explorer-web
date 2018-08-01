import { CacheInvalidationSaga } from './CacheInvalidationSaga'
import { fetchSaga } from './FetchSaga'
import { GetProfileSaga } from './GetProfile'
import { workSearchSaga } from './NavbarSaga'
import { SignInSaga } from './SignIn'
import { SignOutSaga } from './SignOut'

export default [SignInSaga, SignOutSaga, GetProfileSaga, fetchSaga, workSearchSaga, CacheInvalidationSaga]
