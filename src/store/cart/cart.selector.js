import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

//using reselct libray as a form of memoization to cache the value returned from the cartcount and cartTotal operation sfor perfomance optimaztion
//this process eliminates having to rerun the function everytime a cart item is added to the cart
export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.cartIsOpen
);

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cartItemsSlice) => cartItemsSlice.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems?.reduce((cartTotal, cartItem) => cartItem.quantity + cartTotal, 0)
);

export const selectCartItemsTotal = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems?.reduce(
      (cartTotal, cartItem) => cartItem.quantity * cartItem.price + cartTotal,
      0
    )
);
//generate new count

export const selectCartToggle = (state) => state.cart.cartIsOpen;
