/* eslint-disable no-underscore-dangle */
import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
// import axios from 'utils/axios-base';

// import constants
import {
  GET_GROUPS,
  CREATE_GROUP,
  GET_GROUP,
  UPDATE_GROUP,
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
      name: 'Django Mango',
      description: '<p>Use python to draw a Mango</p>',
      languages: ['python'],
      members: ['jasonniu@buffalo.edu', 'chanshuy@buffalo.edu'],
    };
  else if (groupId === '5E3r5g')
    response = {
      name: 'For Each',
      description: '<p>Create an interpreter using python and C++</p>',
      languages: ['python', 'c++'],
      members: ['test@buffalo.edu'],
    };
  else if (groupId === '2E3r5g')
    response = {
      name: 'Web Master',
      description: '<p>Create a website for CSE442</p>',
      languages: ['html', 'css', 'javascript'],
      members: [
        'Bryanmoy@buffalo.edu',
        'Dsager@buffalo.edu',
        'test2@buffalo.edu',
        'test3@buffalo.edu',
      ],
    };
  else if (groupId === '3E3r5g')
    response = {
      name: 'Java Lava',
      description: '<p>Create a game with Java</p>',
      languages: ['java'],
      members: ['test4@buffalo.edu', 'test5@buffalo.edu', 'test6@buffalo.edu'],
    };
  else if (groupId === '4E3r5g')
    response = {
      name: 'Hello World',
      description:
        '<p>Create a tutorial on how to write a program that outputs "Hello World"</p>',
      languages: ['html', 'css', 'javascript', 'c++'],
      members: ['test7@buffalo.edu'],
    };
  else
    response = {
      error: true,
    };
  yield put(getGroupSuccess(response));
}

export function* updateGroupSaga(action) {
  // eslint-disable-next-line no-unused-vars
  const { name, description } = action.payload;
  // to be implemented
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
  yield takeLatest(UPDATE_GROUP, updateGroupSaga);
  yield takeLatest(JOIN_GROUP, joinGroupSaga);
  yield takeLatest(LEAVE_GROUP, leaveGroupSaga);
}
