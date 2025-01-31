import "./cart-icon.styles.jsx";
import {
  CartIconContainer,
  ItemCount,
  ShoppingIcon,
} from "./cart-icon.styles.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItemsCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector.js";
// import CartIcon from "./cart-icon.component";
import { setIsCartOpen } from "../../store/cart/cart.action";

function CartIcon() {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartItemsCount);
  const isCartOpen = useSelector(selectIsCartOpen);

  function toggleCart() {
    dispatch(setIsCartOpen(!isCartOpen));
  }

  return (
    <CartIconContainer onClick={toggleCart}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
}

export default CartIcon;
