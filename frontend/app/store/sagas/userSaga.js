/* eslint-disable no-underscore-dangle */
import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axios from 'utils/axios-base';

import firebase from 'firebase';

// import constants
import {
  LOGIN,
  LOGOUT,
  CHECK_AUTH,
  GET_EMAIL,
} from '../actions/actionConstants';

// import actions
import {
  checkAuthSuccess,
  checkAuthFailed,
  getEmailSuccess,
} from '../actions/userActions';

export function* loginSaga(action) {
  const { payload } = action;
  const { user } = payload;
  const loginResponse = yield axios.post('users', user);
  if (loginResponse.status === 200) {
    localStorage.setItem('token', loginResponse.data.token);
    yield put(push('/groups'));
  }
}

export function* logoutSaga() {
  const logoutResponse = yield axios.get('logout');
  if (logoutResponse.status === 200) {
    localStorage.removeItem('token');
    firebase.auth().signOut();
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

export function* getEmailSaga() {
  const emailResponse = yield axios.post('email');
  if (emailResponse.status === 200) {
    yield put(getEmailSuccess({ email: emailResponse.data.email }));
  }
}

export default function* watchUserSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(CHECK_AUTH, checkAuthSaga);
  yield takeLatest(GET_EMAIL, getEmailSaga);
}
