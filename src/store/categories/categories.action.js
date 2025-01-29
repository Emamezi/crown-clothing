import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_MAP_TYPES } from "./categories.types";

export const setCategories = (categories) =>
  //expects a {type, payload:data}
  createAction(CATEGORIES_MAP_TYPES.SET_CATEGORIES, categories);
