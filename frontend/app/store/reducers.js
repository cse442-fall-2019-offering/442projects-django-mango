/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from '../utils/history';
import languageProviderReducer from '../containers/LanguageProvider/reducer';
import userReducer from './reducers/userReducer';
import groupReducer from './reducers/groupReducer';
import languagesReducer from './reducers/languagesReducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    user: userReducer,
    group: groupReducer,
    languages: languagesReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
