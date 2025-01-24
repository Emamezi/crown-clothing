import { combineReducers } from "redux";
import { userReducer } from "./user/user.Reducer";
import { categoriesReducer } from "./categories/categories.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
});
