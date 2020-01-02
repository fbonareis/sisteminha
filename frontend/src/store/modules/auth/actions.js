export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

export function signUpRequest(name, email, password) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { name, email, password },
  };
}

export function signFailure(error) {
  return {
    type: '@auth/SIGN_FAILURE',
    payload: { error },
  };
}

export function signOutRequest() {
  return {
    type: '@auth/SIGN_OUT_REQUEST',
  };
}

export function signOutSuccess() {
  return {
    type: '@auth/SIGN_OUT_SUCCESS',
  };
}

export function forgotPasswordRequest(email) {
  return {
    type: '@auth/FORGOT_PASSWORD_REQUEST',
    payload: { email },
  };
}

export function forgotPasswordSuccess() {
  return {
    type: '@auth/FORGOT_PASSWORD_SUCCESS',
  };
}
