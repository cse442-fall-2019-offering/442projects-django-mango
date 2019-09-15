/* eslint-disable no-underscore-dangle */
import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
// import axios from 'utils/axios-base';

// import constants
import { GET_GROUPS, CREATE_GROUP } from '../actions/actionConstants';

// import actions
import { getGroupsSuccess } from '../actions/dashboardActions';

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

export default function* watchDashboardSaga() {
  yield takeLatest(GET_GROUPS, getGroupsSaga);
  yield takeLatest(CREATE_GROUP, createGroupSaga);
}
