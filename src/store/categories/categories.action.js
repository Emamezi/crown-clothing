import { getCategoriesAndDocument } from "../../utils/firebase/firebase";
import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_MAP_TYPES } from "./categories.types";

//expects a {type, payload:data}
// export function setCategories2(categories) {
//   return {
//     type: CATEGORIES_MAP_TYPES.SET_CATEGORIES,
//     payload: categories,
//   };
// }

export function fetchCategoriesStart() {
  return createAction(CATEGORIES_MAP_TYPES.FETCH_CATEGORIES_START);
}

export function fetchCategoriesSuccess(categoriesArray) {
  return createAction(
    CATEGORIES_MAP_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );
}

export function fetchCategoriesFailed(error) {
  return createAction(CATEGORIES_MAP_TYPES.FETCH_CATEGORIES_FAILED, error);
}

//creating the categories thunks: usefull for abstracting logic from the UI and making it local to the redux store
export function fetchCategoriesAsync() {
  return async function getCategoriesThunk(dispatch) {
    dispatch(fetchCategoriesStart());
    try {
      const categoriesArray = await getCategoriesAndDocument();
      console.log(categoriesArray);
      dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
      dispatch(fetchCategoriesFailed(error));
    }
  };
}
