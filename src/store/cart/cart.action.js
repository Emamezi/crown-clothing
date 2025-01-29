import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_TYPES } from "./cart.types";

export const addCartItems = (items) =>
  createAction(CART_TYPES.SET_CART_ITEMS, items);

export const removeCartItems = (items) =>
  createAction(CART_TYPES.SET_CART_ITEMS, items);
