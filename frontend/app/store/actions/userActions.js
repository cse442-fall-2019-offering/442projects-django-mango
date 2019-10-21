import {
  LOGIN,
  LOGOUT,
  CHECK_AUTH,
  CHECK_AUTH_SUCCESS,
  CHECK_AUTH_FAILED,
  GET_USER,
  GET_USER_SUCCESS,
  UPDATE_USER,
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

export const getUser = () => ({
  type: GET_USER,
});

export const getUserSuccess = payload => ({
  type: GET_USER_SUCCESS,
  payload,
});

export const updateUser = payload => ({
  type: UPDATE_USER,
  payload,
});
