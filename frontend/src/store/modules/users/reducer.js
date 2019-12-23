import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: '',
};

export default (state = INITIAL_STATE, action) =>
  produce(state, draft => {
    switch (action.type) {
      case '@users/FETCH_REQUEST': {
        return {
          ...draft,
          loading: true,
        };
      }
      case '@users/FETCH_SUCCESS': {
        return {
          ...draft,
          loading: false,
          data: action.payload.users,
        };
      }
      case '@users/FETCH_FAILED': {
        return {
          ...draft,
          loading: false,
          error: action.payload.error,
        };
      }
      default:
        return draft;
    }
  });
