import {
  LOGIN,
  LOGOUT,
  CHECK_AUTH,
  CHECK_AUTH_SUCCESS,
  CHECK_AUTH_FAILED,
  GET_EMAIL,
  GET_EMAIL_SUCCESS,
} from './actionConstants';

export const login = payload => ({
  type: LOGIN,
  payload,
});

export const logout = () => ({
  type: LOGOUT,
});

export const checkAuth = () => ({
  type: CHECK_AUTH,
});

export const checkAuthSuccess = () => ({
  type: CHECK_AUTH_SUCCESS,
});

export const checkAuthFailed = () => ({
  type: CHECK_AUTH_FAILED,
});

export const getEmail = () => ({
  type: GET_EMAIL,
});

export const getEmailSuccess = payload => ({
  type: GET_EMAIL_SUCCESS,
  payload,
});
