import produce from 'immer';
import {
  CHECK_AUTH_SUCCESS,
  CHECK_AUTH_FAILED,
  GET_EMAIL_SUCCESS,
} from '../actions/actionConstants';

// The initial state of the App
export const initialState = {
  auth: false,
  user: {
    email: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHECK_AUTH_SUCCESS:
        draft.auth = true;
        break;
      case CHECK_AUTH_FAILED:
        draft.auth = false;
        break;
      case GET_EMAIL_SUCCESS:
        draft.user.email = action.payload;
        break;
    }
  });

export default userReducer;
