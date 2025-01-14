import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./cart-icon.styles.jsx";
import {
  CartIconContainer,
  ItemCount,
  ShoppingIcon,
} from "./cart-icon.styles.jsx";
// import CartIcon from "./cart-icon.component";

function CartIcon() {
  const { setIsCartOpen } = useContext(CartContext);
  const { cartCount } = useContext(CartContext);

  function toggleCart() {
    setIsCartOpen((isCartOpen) => !isCartOpen);
  }

  return (
    <CartIconContainer onClick={toggleCart}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
}

export default CartIcon;
