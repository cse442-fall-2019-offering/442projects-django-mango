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

const makeSelectName = () =>
  createSelector(
    selectUser,
    userState => userState.user.name,
  );

const makeSelectLanguages = () =>
  createSelector(
    selectUser,
    userState => userState.user.languages,
  );

export {
  selectUser,
  makeSelectAuth,
  makeSelectEmail,
  makeSelectName,
  makeSelectLanguages,
};
