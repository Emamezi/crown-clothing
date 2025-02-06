import { all, call, put, takeLatest } from "redux-saga/effects";
import { getCategoriesAndDocument } from "../../utils/firebase/firebase";
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./categories.action";
import { CATEGORIES_MAP_TYPES } from "./categories.types";

// export function fetchCategoriesAsync() {
//   return async function getCategoriesThunk(dispatch) {
//     // dispatch(fetchCategoriesStart());
//     try {
//       const categoriesArray = await getCategoriesAndDocument();
//       console.log(categoriesArray);
//       dispatch(fetchCategoriesSuccess(categoriesArray));
//     } catch (error) {
//       dispatch(fetchCategoriesFailed(error));
//     }
//   };
// }
export function* fetchCategoriesAsync() {
  try {
    //have a function and need to turn it into an effect the use the call as used below
    const categoriesArray = yield call(getCategoriesAndDocument);
    //put === generator version of dispatch for redux or reducers
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  //take -receive actions //takeLatest-->cancel previous requests and return with the latest
  yield takeLatest(
    CATEGORIES_MAP_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
