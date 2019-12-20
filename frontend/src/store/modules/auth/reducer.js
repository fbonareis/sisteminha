import { AUTH_REQUEST, AUTH_REQUEST_SUCCESS } from './types';

const initialState = {
  email: '',
  password: '',
  loading: true,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        email: action.email,
        password: action.password,
      };

    case AUTH_REQUEST_SUCCESS:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
