import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_MAP_TYPES } from "./categories.types";

export const setCategoriesMap = (categoriesMap) =>
  //expects a {type, payload:data}
  createAction(CATEGORIES_MAP_TYPES.SET_CATEGORIES_MAP, categoriesMap);
