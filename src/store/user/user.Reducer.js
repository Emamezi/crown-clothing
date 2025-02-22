//creating default action types using object to keep track easily in application and avoid errors

import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_USER_STATE = {
  currentUser: null,
  isloading: false,
  error: null,
};

export function userReducer(state = INITIAL_USER_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.USER_SIGNIN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
      };

    case USER_ACTION_TYPES.USER_SIGN_OUT_SUCCESS:
      return { ...state, currentUser: null };

    case USER_ACTION_TYPES.USER_SIGNIN_FAILED:
    case USER_ACTION_TYPES.USER_SIGN_UP_FAILED:
    case USER_ACTION_TYPES.USER_SIGN_OUT_FAILED:
      return { ...state, error: payload };
    default:
      return state;
  }
}
