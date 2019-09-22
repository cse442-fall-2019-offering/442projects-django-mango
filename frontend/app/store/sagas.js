import { all, call, fork } from 'redux-saga/effects';

// import all the sagas here and add it to the below sagas array
import groupSaga from './sagas/groupSaga';

function* rootSaga() {
  const sagas = [groupSaga];

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
