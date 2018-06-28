import { CacheInvalidationSaga } from './CacheInvalidationSaga'
import { fetchSaga } from './FetchSaga'
import { GetProfileSaga } from './GetProfile.saga'
import { workSearchSaga } from './NavbarSaga'
import { SignInSaga } from './SignIn.saga'

export default [SignInSaga, GetProfileSaga, fetchSaga, workSearchSaga, CacheInvalidationSaga]
