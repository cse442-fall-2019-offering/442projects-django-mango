import { all, call, fork } from 'redux-saga/effects';

// import all the sagas here and add it to the below sagas array
import userSaga from './sagas/userSaga';
import groupSaga from './sagas/groupSaga';
import languagesSaga from './sagas/languagesSaga';

function* rootSaga() {
  const sagas = [userSaga, groupSaga, languagesSaga];

  yield all(
    sagas.map(saga =>
      // eslint-disable-next-line func-names
      fork(function*() {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
          }
        }
      }),
    ),
  );
}

export default rootSaga;
