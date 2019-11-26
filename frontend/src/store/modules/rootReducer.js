import { combineReducers } from "redux";

import { authReducer } from "./auth/reducer";

export const Reducers = combineReducers({
  auth: authReducer
});
