import { createSelector } from 'reselect';
import { initialState } from '../reducers/userReducer';

const selectUser = state => state.user || initialState;

const makeSelectAuth = () =>
  createSelector(
    selectUser,
    userState => userState.auth,
  );

const makeSelectEmail = () =>
  createSelector(
    selectUser,
    userState => userState.user.email,
  );

export { selectUser, makeSelectAuth, makeSelectEmail };
