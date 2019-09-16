import {
  GET_GROUPS,
  GET_GROUPS_SUCCESS,
  CREATE_GROUP,
} from './actionConstants';

export const getGroups = () => ({
  type: GET_GROUPS,
});

export const getGroupsSuccess = payload => ({
  type: GET_GROUPS_SUCCESS,
  payload,
});

export const createGroup = payload => ({
  type: CREATE_GROUP,
  payload,
});
