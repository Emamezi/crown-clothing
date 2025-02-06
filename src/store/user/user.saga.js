import { all, takeLatest, call, put } from "redux-saga/effects";
import {
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthWithEmailAndPassword,
  signInWithGooglePopUp,
} from "../../utils/firebase/firebase";
import { USER_ACTION_TYPES } from "./user.types";
import { userSigninFailed, userSigninSuccess } from "./user.actions";

export function* getSnapShotFromUserAuth(userAuth, additionalInfo) {
  try {
    const userSnapShot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalInfo
    );
    yield put(
      userSigninSuccess({ id: userSnapShot.id, ...userSnapShot.data() })
    );
  } catch (error) {
    yield put(userSigninFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapShotFromUserAuth, userAuth);
    // yield put(userSigninSuccess(user));
  } catch (error) {
    yield put(userSigninFailed(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapShotFromUserAuth, user);
  } catch (error) {
    yield put(userSigninFailed(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopUp);
    yield call(getSnapShotFromUserAuth, user);
  } catch (error) {
    yield put(userSigninFailed(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGNIN_START, signInWithEmail);
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGNIN_START, signInWithGoogle);
}
export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onEmailSignInStart),
    call(onGoogleSignInStart),
  ]);
}
