import produce from 'immer';
import { GET_LANGUAGES_SUCCESS } from '../actions/actionConstants';

// The initial state of the App
export const initialState = {
  languages: [],
};

/* eslint-disable default-case, no-param-reassign */
const languagesReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LANGUAGES_SUCCESS:
        draft.languages = action.payload;
        break;
    }
  });

export default languagesReducer;
