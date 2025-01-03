import { createContext, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
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

function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  //triggers whenever users clicks on add to cart
  function addItemToCart(productToAdd) {
    setCartItems(addCartItem(cartItems, productToAdd));
  }
  const cartCount = cartItems.reduce(
    (cartCount, cartItem) => cartItem.quantity + cartCount,
    0
  );

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    setCartItems,
    addItemToCart,
    cartCount,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
