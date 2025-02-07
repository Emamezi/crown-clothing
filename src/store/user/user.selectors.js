import { createSelector } from "reselect";

const selectUserReducer = (state) => state.user;

export const selectCurrentUser = (state) => state.user.currentUser;

export const selectDisplayName = createSelector([selectUserReducer], (user) =>
  user.currentUser?.displayName?.split(" ").at(0)
);
