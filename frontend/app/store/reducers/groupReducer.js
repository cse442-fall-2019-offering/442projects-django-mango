import produce from 'immer';
import {
  GET_GROUPS_SUCCESS,
  GET_GROUP_SUCCESS,
  JOIN_GROUP_SUCCESS,
  LEAVE_GROUP_SUCCESS,
} from '../actions/actionConstants';

// The initial state of the App
export const initialState = {
  dashboard: {
    groups: [],
  },
  group: {
    name: '',
    description: '',
    languages: [],
    members: [],
    error: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const groupReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_GROUPS_SUCCESS:
        draft.dashboard = action.payload;
        break;
      case GET_GROUP_SUCCESS:
        draft.group = action.payload;
        break;
      case JOIN_GROUP_SUCCESS:
        // draft.group = action.payload;
        break;
      case LEAVE_GROUP_SUCCESS:
        draft.group = action.payload;
        break;
    }
  });

export default groupReducer;
