import { createSelector } from 'reselect';
import { initialState } from '../reducers/groupReducer';

const selectGroups = state => state.group || initialState;

const makeSelectGroups = () =>
  createSelector(
    selectGroups,
    groupState => groupState.dashboard.groups,
  );

const makeSelectGroup = () =>
  createSelector(
    selectGroups,
    groupState => groupState.group.group,
  );

export { selectGroups, makeSelectGroups, makeSelectGroup };
