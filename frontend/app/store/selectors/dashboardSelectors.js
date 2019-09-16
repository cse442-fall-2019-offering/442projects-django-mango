import { createSelector } from 'reselect';
import { initialState } from '../reducers/dashboardReducer';

const selectGroups = state => state.dashboard || initialState;

const makeSelectGroups = () =>
  createSelector(
    selectGroups,
    dashboardState => dashboardState.groups,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGroups,
    dashboardState => dashboardState.loading,
  );

export { selectGroups, makeSelectGroups, makeSelectLoading };
