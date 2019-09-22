/* eslint-disable no-underscore-dangle */
import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
// import axios from 'utils/axios-base';

// import constants
import {
  GET_GROUPS,
  CREATE_GROUP,
  GET_GROUP,
  JOIN_GROUP,
  LEAVE_GROUP,
} from '../actions/actionConstants';

// import actions
import {
  getGroupsSuccess,
  getGroupSuccess,
  joinGroupSuccess,
  // leaveGroupSuccess,
} from '../actions/groupActions';

export function* getGroupsSaga() {
  // dummy data
  const response = {
    groups: [
      [
        '1E3r5g',
        'Django Mango',
        ['python'],
        ['jasonniu@buffalo.edu', 'chanshuy@buffalo.edu'],
      ],
      ['5E3r5g', 'For Each', ['python', 'c++'], ['test@buffalo.edu']],
      [
        '2E3r5g',
        'Web Master',
        ['html', 'css', 'javascript'],
        [
          'Bryanmoy@buffalo.edu',
          'Dsager@buffalo.edu',
          'test2@buffalo.edu',
          'test3@buffalo.edu',
        ],
      ],
      [
        '3E3r5g',
        'Java Lava',
        ['java'],
        ['test4@buffalo.edu', 'test5@buffalo.edu', 'test6@buffalo.edu'],
      ],
      [
        '4E3r5g',
        'Hello World',
        ['html', 'css', 'javascript', 'c++'],
        ['test7@buffalo.edu'],
      ],
    ],
  };
  yield put(getGroupsSuccess(response));
}

export function* createGroupSaga(action) {
  const { groupId } = action.payload;
  // to be implemented
  yield put(push(`groups/${groupId}`));
}

export function* getGroupSaga(action) {
  const { groupId } = action.payload;
  let response = {};
  if (groupId === '1E3r5g')
    response = {
      group: [
        '1E3r5g',
        'Django Mango',
        ['python'],
        ['jasonniu@buffalo.edu', 'chanshuy@buffalo.edu'],
      ],
    };
  else if (groupId === '5E3r5g')
    response = {
      group: ['5E3r5g', 'For Each', ['python', 'c++'], ['test@buffalo.edu']],
    };
  else if (groupId === '2E3r5g')
    response = {
      group: [
        '2E3r5g',
        'Web Master',
        ['html', 'css', 'javascript'],
        [
          'Bryanmoy@buffalo.edu',
          'Dsager@buffalo.edu',
          'test2@buffalo.edu',
          'test3@buffalo.edu',
        ],
      ],
    };
  else if (groupId === '3E3r5g')
    response = {
      group: [
        '3E3r5g',
        'Java Lava',
        ['java'],
        ['test4@buffalo.edu', 'test5@buffalo.edu', 'test6@buffalo.edu'],
      ],
    };
  else if (groupId === '4E3r5g')
    response = {
      group: [
        '4E3r5g',
        'Hello World',
        ['html', 'css', 'javascript', 'c++'],
        ['test7@buffalo.edu'],
      ],
    };
  yield put(getGroupSuccess(response));
}

export function* joinGroupSaga(action) {
  // eslint-disable-next-line no-unused-vars
  const { groupId } = action.payload;
  // to be implemented
  yield put(joinGroupSuccess());
}

export function* leaveGroupSaga(action) {
  // eslint-disable-next-line no-unused-vars
  const { groupId } = action.payload;
  // to be implemented
  // yield put(leaveGroupSuccess(response));
}

export default function* watchGroupSaga() {
  yield takeLatest(GET_GROUPS, getGroupsSaga);
  yield takeLatest(CREATE_GROUP, createGroupSaga);
  yield takeLatest(GET_GROUP, getGroupSaga);
  yield takeLatest(JOIN_GROUP, joinGroupSaga);
  yield takeLatest(LEAVE_GROUP, leaveGroupSaga);
}
