/*
 *
 * DataProvider actions
 *
 */

import {
  ADD_FILE,
  SET_VISIBILITY_FILTER,
  SELECT_FILE,
} from './constants';

let nextFileId = 1;
export const addFile = (text,name) => {
  return {
    type: ADD_FILE,
    id: nextFileId++,
    text,
    name
  }
};

export const setVisibilityFilter = filter => {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  }
}

export const toggleFile = id => {
  return {
    type: SELECT_FILE,
    id
  }
}
