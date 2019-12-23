import { combineReducers } from 'redux';

import auth from './auth/reducer';
import users from './users/reducer';

export default combineReducers({
  auth,
  users,
});
