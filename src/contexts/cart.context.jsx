import { createContext, useState } from "react";

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

function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  //using derived state instead of useEffect call back to reduce the amput of rerenders for performance optimization
  const cartCount = cartItems.reduce(
    (cartCount, cartItem) => cartItem.quantity + cartCount,
    0
  );
  const cartPriceTotal = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  );
  //triggers whenever users clicks on add to cart
  function addItemToCart(productToAdd) {
    setCartItems(addCartItem(cartItems, productToAdd));
  }
  function removeItemToCart(cartItemToRemove) {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  }
  function clearItemFromCart(cartItemToClear) {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    setCartItems,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartCount,
    cartPriceTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
