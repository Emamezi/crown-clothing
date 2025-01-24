import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

export function setCurrentUser(user) {
  return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
}

export function setDisplayName(name) {
  return createAction(USER_ACTION_TYPES.SET_DISPLAY_NAME, name);
}
