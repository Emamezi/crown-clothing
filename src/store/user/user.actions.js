import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

export const checkUserSession = () =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSigninStart = () =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGNIN_START);

export const emailSigninStart = (email, password) =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGNIN_START, { email, password });

export const userSigninSuccess = (user) =>
  createAction(USER_ACTION_TYPES.USER_SIGNIN_SUCCESS, user);

export const userSigninFailed = (error) =>
  createAction(USER_ACTION_TYPES.USER_SIGNIN_FAILED, error);
