import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import users from './users/sagas';

export default function* rootSaga() {
  return yield all([auth, users]);
}
