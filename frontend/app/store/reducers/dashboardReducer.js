import produce from 'immer';
import {
  GET_GROUPS,
  GET_GROUPS_SUCCESS,
  CREATE_GROUP,
} from '../actions/actionConstants';

// The initial state of the App
export const initialState = {
  loading: false,
  groups: [],
};

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_GROUPS:
        draft.loading = true;
        break;
      case GET_GROUPS_SUCCESS:
        draft.loading = false;
        draft.groups = action.payload.groups;
        break;
      case CREATE_GROUP:
        draft.loading = true;
        break;
    }
  });

export default dashboardReducer;
