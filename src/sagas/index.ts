import { fetchSaga } from './FetchSaga';
import { workSearchSaga } from './NavbarSaga';
import { sessionSaga } from './SessionSaga';
import { profileSaga } from './ProfileSaga';
import { signTransaction } from './SignTxSaga';
import { submitClaims } from './SubmitClaims';
import { transferSaga } from './TransferSaga';
import { withdrawal } from './Withdrawal';
import { purchaseLicenseSaga } from './PurchaseLicense';
import { CacheInvalidationSaga } from './CacheInvalidationSaga';
import { createWorkSaga } from './CreateWorkSaga';
import { tryItOut } from './TryItOut';
import { notificationsSaga } from './Notifications';

export default [
  fetchSaga,
  workSearchSaga,
  sessionSaga,
  transferSaga,
  profileSaga,
  submitClaims,
  signTransaction,
  withdrawal,
  purchaseLicenseSaga,
  CacheInvalidationSaga,
  createWorkSaga,
  tryItOut,
  notificationsSaga
];