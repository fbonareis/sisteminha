export function fetchRequest() {
  return {
    type: '@users/FETCH_REQUEST',
  };
}

export function fetchSuccess(users) {
  return {
    type: '@users/FETCH_SUCCESS',
    payload: { users },
  };
}

export function fetchFailed(error) {
  return {
    type: '@users/FETCH_FAILED',
    payload: { error },
  };
}
