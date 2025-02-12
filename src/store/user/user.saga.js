import { all, takeLatest, call, put } from "redux-saga/effects";
import {
  createAuthFromEmailandPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthWithEmailAndPassword,
  signInWithGooglePopUp,
  signOutAuthUser,
} from "../../utils/firebase/firebase";
import { USER_ACTION_TYPES } from "./user.types";
import {
  userSigninFailed,
  userSigninSuccess,
  signUpSuccess,
  signOutFailed,
  signoutSuccess,
} from "./user.actions";

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

export function* signInAfterSignUp({ payload: { user, additionalInfo } }) {
  yield call(getSnapShotFromUserAuth, user, additionalInfo);
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthFromEmailandPassword,
      email,
      password
    );
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(userSigninFailed(error));
  }
}

export function* signOut() {
  try {
    yield call(signOutAuthUser);
    yield put(signoutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
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

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.USER_SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.USER_SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignoutStart() {
  yield takeLatest(USER_ACTION_TYPES.USER_SIGN_OUT_START, signOut);
}
export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onEmailSignInStart),
    call(onGoogleSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignoutStart),
  ]);
}
