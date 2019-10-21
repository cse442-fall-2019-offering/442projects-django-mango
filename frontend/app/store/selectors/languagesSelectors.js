import { createSelector } from 'reselect';
import { initialState } from '../reducers/languagesReducer';

const selectLanguages = state => state.languages || initialState;

const makeSelectLanguages = () =>
  createSelector(
    selectLanguages,
    languagesState => languagesState.languages,
  );

export { selectLanguages, makeSelectLanguages };
