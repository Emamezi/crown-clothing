import { CATEGORIES_MAP_TYPES } from "./categories.types";

export const CATEGORIES_INITIAL_STATE = {
  categoriesMap: {},
};

export function categoriesReducer(state = CATEGORIES_INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case CATEGORIES_MAP_TYPES.SET_CATEGORIES_MAP:
      return { ...state, categoriesMap: payload };

    default:
      return state;
  }
}
