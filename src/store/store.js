import { compose, applyMiddleware, createStore } from "redux";
// import logger from "redux-logger";

import { rootReducer } from "./rootReducer";

//runs before an action reaches the reduces
// const middleWares = [logger];
const loggerMiddleWare = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }
  console.log("type", action.type);
  console.log("payload", action.payload);
  console.log("current state", store.getState());

  next(action);
  console.log("next state: ", store.getState());
};

const middleWares = [loggerMiddleWare];
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
