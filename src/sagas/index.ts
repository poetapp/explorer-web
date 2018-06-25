import { CacheInvalidationSaga } from './CacheInvalidationSaga'
import { fetchSaga } from './FetchSaga'
import { workSearchSaga } from './NavbarSaga'
import { SignInSaga } from './SignIn.saga'

export default [SignInSaga, fetchSaga, workSearchSaga, CacheInvalidationSaga]
