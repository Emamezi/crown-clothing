import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_TYPES } from "./cart.types";

export const setIsCartOpen = (boolean) =>
  createAction(CART_TYPES.SET_TOGGLE_CART, boolean);

function addCartItem(cartItems, productToAdd) {
  //find if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // if exixts increase quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  //return new array of moddified cartItems/ newItem
  return [...cartItems, { ...productToAdd, quantity: 1 }];
}

function removeCartItem(cartItems, cartItemToRemove) {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  //check if cartitem quantity ===1, if so remove item completely from cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
}

function clearCartItem(cartItems, cartItemToClear) {
  //using filter array method to return back a nrew array that passes the arguementn criteria
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
}

export function addItemToCart(cartItems, productToAdd) {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_TYPES.SET_CART_ITEMS, newCartItems);
}
export function removeItemToCart(cartItems, cartItemToRemove) {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_TYPES.SET_CART_ITEMS, newCartItems);
}
export function clearItemFromCart(cartItems, cartItemToClear) {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createAction(CART_TYPES.SET_CART_ITEMS, newCartItems);
}
