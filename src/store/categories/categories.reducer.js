import { CATEGORIES_MAP_TYPES } from "./categories.types";

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
};

export function categoriesReducer(state = CATEGORIES_INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case CATEGORIES_MAP_TYPES.SET_CATEGORIES:
      return { ...state, categories: payload };

    default:
      return state;
  }
}
