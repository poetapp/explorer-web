import { CacheInvalidationSaga } from './CacheInvalidationSaga'
import { fetchSaga } from './FetchSaga'
import { GetProfileSaga } from './GetProfile'
import { workSearchSaga } from './NavbarSaga'
import { SignInSaga } from './SignIn'

export default [SignInSaga, GetProfileSaga, fetchSaga, workSearchSaga, CacheInvalidationSaga]
