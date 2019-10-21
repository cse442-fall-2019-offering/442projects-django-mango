/* eslint-disable no-underscore-dangle */
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'utils/axios-base';

// import constants
import { GET_LANGUAGES } from '../actions/actionConstants';

// import actions
import { getLanguagesSuccess } from '../actions/languagesActions';

export function* getLanguagesSaga() {
  const languagesResponse = yield axios.get('lang');
  if (languagesResponse.status === 200) {
    yield put(getLanguagesSuccess(languagesResponse.data));
  }
}

export default function* watchLanguagesSaga() {
  yield takeLatest(GET_LANGUAGES, getLanguagesSaga);
}
