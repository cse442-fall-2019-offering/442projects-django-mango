import { GET_LANGUAGES, GET_LANGUAGES_SUCCESS } from './actionConstants';

export const getLanguages = () => ({
  type: GET_LANGUAGES,
});

export const getLanguagesSuccess = payload => ({
  type: GET_LANGUAGES_SUCCESS,
  payload,
});
