import { combineReducers } from "redux";
import { userReducer } from "./user/user.Reducer";
export const rootReducer = combineReducers({
  user: userReducer,
});
