import { takeLatest, call, put, all } from 'redux-saga/effects';

import { api, history } from '~/services';

import { signInSuccess, signFailure, signOutSuccess } from './actions';

export function* signIn({ payload }) {
  try {
    const response = yield call(api.post, 'sessions', payload);

    if (response.data.status === 'error') throw response.data.message;

    const { token, user } = response.data;

    yield put(signInSuccess(token.token, user));
    history.push('/dashboard');
  } catch (err) {
    yield put(signFailure(err));
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
    });

    history.push('/');
  } catch (err) {
    // toast.error('Falha no cadastro, verifique seus dados!');

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function* signOut() {
  yield put(signOutSuccess());
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT_REQUEST', signOut),
]);
