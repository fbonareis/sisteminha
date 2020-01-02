import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
  error: '',
};

export default (state = INITIAL_STATE, action) =>
  produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST':
        return {
          ...draft,
          loading: true,
        };

      case '@auth/SIGN_IN_SUCCESS':
        return {
          ...draft,
          loading: false,
          signed: true,
          token: action.payload.token,
        };

      case '@auth/SIGN_FAILURE':
        return {
          ...draft,
          loading: false,
          error: action.payload.error,
        };

      case '@auth/SIGN_OUT_REQUEST':
        return {
          ...draft,
          loading: true,
        };

      case '@auth/SIGN_OUT_SUCCESS':
        return {
          ...draft,
          loading: false,
          signed: false,
          token: null,
        };

      case '@auth/FORGOT_PASSWORD_REQUEST':
        return {
          ...draft,
          loading: true,
        };

      case '@auth/FORGOT_PASSWORD_SUCCESS':
        return {
          loading: false,
        };

      default:
        return draft;
    }
  });
