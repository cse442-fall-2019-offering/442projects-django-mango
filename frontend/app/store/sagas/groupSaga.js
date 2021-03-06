/* eslint-disable no-underscore-dangle */
import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axios from 'utils/axios-base';

// import constants
import {
  GET_GROUPS,
  CREATE_GROUP,
  GET_GROUP,
  UPDATE_GROUP,
  JOIN_GROUP,
  LEAVE_GROUP,
  GET_SETTINGS,
  UPDATE_SETTINGS,
} from '../actions/actionConstants';

// import actions
import {
  getGroupsSuccess,
  getGroupSuccess,
  getGroupFailure,
  joinGroupSuccess,
  leaveGroupSuccess,
  getSettingsSuccess,
  getSettingsFailed,
} from '../actions/groupActions';

export function* getGroupsSaga() {
  const groupsResponse = yield axios.get('group');
  if (groupsResponse.status === 200) {
    yield put(getGroupsSuccess({ groups: groupsResponse.data }));
  }
}

export function* createGroupSaga(action) {
  const { payload } = action;
  const groupResponse = yield axios.post('group', {
    name: payload.name,
    description: payload.description,
    languages: payload.languages,
    contact: payload.contact,
    public: payload.public,
  });
  if (groupResponse.status === 200) {
    yield put(push(`${groupResponse.data.identity}`));
  }
}

export function* getGroupSaga(action) {
  const { groupId } = action.payload;
  try {
    const groupResponse = yield axios.get(`group/${groupId}`);
    yield put(getGroupSuccess(groupResponse.data));
  } catch {
    yield put(getGroupFailure());
  }
}

export function* updateGroupSaga(action) {
  const { payload } = action;
  const { groupId } = payload;
  const updateResponse = yield axios.put(`group/${groupId}`, {
    name: payload.name,
    description: payload.description,
    languages: payload.languages,
    contact: payload.contact,
    public: payload.public,
  });
  if (updateResponse.status === 200) {
    yield put(getGroupSuccess(updateResponse.data));
  }
}

export function* joinGroupSaga(action) {
  const { groupId } = action.payload;
  const joinResponse = yield axios.get(`join_group/${groupId}`);
  if (joinResponse.status === 200) {
    yield put(joinGroupSuccess(joinResponse.data));
  }
}

export function* leaveGroupSaga(action) {
  const { groupId } = action.payload;
  const leaveResponse = yield axios.get(`leave_group/${groupId}`);
  if (leaveResponse.status === 200) {
    if (!leaveResponse.data.deleted) {
      yield put(leaveGroupSuccess(leaveResponse.data.data));
    } else {
      yield put(push('/groups'));
    }
  }
}

export function* getSettingsSaga() {
  try {
    const settingsResponse = yield axios.get('settings');
    yield put(getSettingsSuccess(settingsResponse.data));
  } catch {
    yield put(getSettingsFailed());
  }
}

export function* updateSettingsSaga(action) {
  yield axios.put('settings', action.payload);
}

export default function* watchGroupSaga() {
  yield takeLatest(GET_GROUPS, getGroupsSaga);
  yield takeLatest(CREATE_GROUP, createGroupSaga);
  yield takeLatest(GET_GROUP, getGroupSaga);
  yield takeLatest(UPDATE_GROUP, updateGroupSaga);
  yield takeLatest(JOIN_GROUP, joinGroupSaga);
  yield takeLatest(LEAVE_GROUP, leaveGroupSaga);
  yield takeLatest(GET_SETTINGS, getSettingsSaga);
  yield takeLatest(UPDATE_SETTINGS, updateSettingsSaga);
}
