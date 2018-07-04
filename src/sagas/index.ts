import { CacheInvalidationSaga } from './CacheInvalidationSaga'
import { fetchSaga } from './FetchSaga'
import { workSearchSaga } from './NavbarSaga'

export default [fetchSaga, workSearchSaga, CacheInvalidationSaga]
