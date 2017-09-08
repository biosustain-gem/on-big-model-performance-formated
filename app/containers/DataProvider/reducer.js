/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';
import init_Data from "data/E coli core.Core metabolism.json";

import {
  ADD_FILE,
  SET_VISIBILITY_FILTER,
  SELECT_FILE,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  files:[{
    id: 0,
    data: init_Data,
    title: init_Data[0].map_name,
    name: "../data/esher_map_pch_0317.json",
    completed: false
  }],
  selected: 0,
});

function fileList(state = initialState, action) {
  switch (action.type) {
    case ADD_FILE:
      let data = JSON.parse(action.text);
      if (data.constructor === Array) {
        return {
          files:  [
            ...state.files,
            {
              id: action.id,
              data,
              title: data[0].map_name,
              name: action.name,
              completed: false
            }
          ],
          selected: action.id
        }
      } else {
        let file = {
          id: action.id,
          title: "File " + action.name + " is not valid escher map.",
          completed: false
        };
        return {
          files: [
            ...state.files,
            file
          ],
          selected: undefined
        };
      }
    case SELECT_FILE:
      console.log(state,action.id);
      return {
        files: state.files,
        selected: action.id
      };
    default:
      return state;
  }
}

export default homeReducer;
