import { CART_TYPES } from "./cart.types";

const CART_INITAL_STATE = {
  cartIsOpen: false,
  cartItems: [],
};

export const cartReducer = (state = CART_INITAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_TYPES.SET_TOGGLE_CART:
      return {
        ...state,
        cartIsOpen: payload,
      };
    case CART_TYPES.SET_CART_ITEMS:
      return { ...state, cartItems: payload };
    default:
      return state;
  }
};
