import { compose, applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
// import { createStore } from "../../node_modules/redux/src/createStore";

import { rootReducer } from "./rootReducer";

//root-reducer
//runs before an action reaches the reduces
const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
