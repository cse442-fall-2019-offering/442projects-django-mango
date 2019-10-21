/* eslint-disable no-underscore-dangle */
import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axios from 'utils/axios-base';

// import constants
import {
  LOGIN,
  LOGOUT,
  CHECK_AUTH,
  GET_USER,
  UPDATE_USER,
} from '../actions/actionConstants';

// import actions
import {
  checkAuthSuccess,
  checkAuthFailed,
  getUserSuccess,
} from '../actions/userActions';

export function* loginSaga(action) {
  const { payload } = action;
  const { user } = payload;
  const loginResponse = yield axios.post('login', user);
  if (loginResponse.status === 200) {
    localStorage.setItem('token', loginResponse.data.token);
    yield put(push('/groups'));
    window.location.reload();
  }
}

export function* logoutSaga() {
  const logoutResponse = yield axios.get('logout');
  if (logoutResponse.status === 200) {
    localStorage.removeItem('token');
    window.location.reload();
  }
}

export function* checkAuthSaga() {
  const token = localStorage.getItem('token');
  if (token === null) {
    yield put(checkAuthFailed());
  }
  const authResponse = yield axios.get('auth');
  if (authResponse.status === 200) {
    if (authResponse.data.auth) {
      yield put(checkAuthSuccess());
    } else {
      yield put(checkAuthFailed());
    }
  } else {
    yield put(checkAuthFailed());
  }
}

export function* getUserSaga() {
  const userResponse = yield axios.get('users');
  if (userResponse.status === 200) {
    yield put(getUserSuccess(userResponse.data));
  }
}

export function* updateUserSaga(action) {
  yield axios.put('users', action.payload);
}

export default function* watchUserSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(CHECK_AUTH, checkAuthSaga);
  yield takeLatest(GET_USER, getUserSaga);
  yield takeLatest(UPDATE_USER, updateUserSaga);
}
