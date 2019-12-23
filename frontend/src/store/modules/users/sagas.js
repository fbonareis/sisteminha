import { select, takeLatest, call, put, all } from 'redux-saga/effects';

import { api } from '~/services';

import { fetchSuccess, fetchFailed } from './actions';

export function* fetch() {
  try {
    const { token } = yield select(state => state.auth);

    api.defaults.headers.Authorization = `Bearer ${token}`;

    const { data } = yield call(api.get, 'users');

    yield put(fetchSuccess(data.users));
  } catch (err) {
    yield put(fetchFailed(err));
  }
}

export default all([takeLatest('@users/FETCH_REQUEST', fetch)]);
