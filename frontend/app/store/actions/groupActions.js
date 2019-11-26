import {
  GET_GROUPS,
  GET_GROUPS_SUCCESS,
  CREATE_GROUP,
  GET_GROUP,
  GET_GROUP_SUCCESS,
  UPDATE_GROUP,
  JOIN_GROUP,
  JOIN_GROUP_SUCCESS,
  LEAVE_GROUP,
  LEAVE_GROUP_SUCCESS,
  GET_GROUP_FAILURE,
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

export const getGroup = payload => ({
  type: GET_GROUP,
  payload,
});

export const getGroupSuccess = payload => ({
  type: GET_GROUP_SUCCESS,
  payload,
});

export const getGroupFailure = () => ({
  type: GET_GROUP_FAILURE,
});

export const updateGroup = payload => ({
  type: UPDATE_GROUP,
  payload,
});

export const joinGroup = payload => ({
  type: JOIN_GROUP,
  payload,
});

export const joinGroupSuccess = payload => ({
  type: JOIN_GROUP_SUCCESS,
  payload,
});

export const leaveGroup = payload => ({
  type: LEAVE_GROUP,
  payload,
});

export const leaveGroupSuccess = payload => ({
  type: LEAVE_GROUP_SUCCESS,
  payload,
});
