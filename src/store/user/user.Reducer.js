//creating default action types using object to keep track easily in application and avoid errors

import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_USER_STATE = {
  currentUser: null,
  displayName: null,
};

export function userReducer(state = INITIAL_USER_STATE, action) {
  switch (action.type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case USER_ACTION_TYPES.SET_DISPLAY_NAME:
      return { ...state, displayName: action.payload };
    default:
      return state;
  }
}
