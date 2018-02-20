import { fetchSaga } from './FetchSaga'
import { workSearchSaga } from './NavbarSaga'
import { CacheInvalidationSaga } from './CacheInvalidationSaga'

export default [
  fetchSaga,
  workSearchSaga,
  CacheInvalidationSaga,
]