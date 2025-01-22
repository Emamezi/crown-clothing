import { createContext, useReducer } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  removeItem: () => {},
  clearItemFromCart: () => {},
  cartPriceTotal: 0,
});

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

const CART_DEFAULT_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  TOGGLE_CART_OPEN: "TOGGLE_CART_OPEN",
};

function cartReducer(state, action) {
  const { payload, type } = action;

  switch (type) {
    case CART_ACTION_TYPES.TOGGLE_CART_OPEN:
      return { ...state, isCartOpen: payload };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`unhandled type of ${type}`);
  }
}

function CartProvider({ children }) {
  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, CART_DEFAULT_STATE);

  function updateCartItemsReducer(newCartItems) {
    //generate new total
    const newCartCount = newCartItems.reduce(
      (cartTotal, cartItem) => cartItem.quantity + cartTotal,
      0
    );

    //generate new count
    const newTotal = newCartItems.reduce(
      (cartTotal, cartItem) => cartTotal + cartItem.price * cartItem.quantity,
      0
    );

    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        cartTotal: newTotal,
        cartCount: newCartCount,
      },
    });
  }

  //triggers whenever users clicks on add to cart
  function addItemToCart(productToAdd) {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  }
  function removeItemToCart(cartItemToRemove) {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  }
  function clearItemFromCart(cartItemToClear) {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  }
  function setIsCartOpen(bool) {
    return dispatch({
      type: CART_ACTION_TYPES.TOGGLE_CART_OPEN,
      payload: bool,
    });
  }

  const value = {
    cartItems,
    cartCount,
    setIsCartOpen,
    cartTotal,
    isCartOpen,
    clearItemFromCart,
    removeItemToCart,
    addItemToCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
