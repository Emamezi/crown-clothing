import "./cart-dropdown.styles.jsx";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";
import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles.jsx";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector.js";

function CartDropdown() {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems?.length ? (
          cartItems.map((item) => <CartItem cartItem={item} key={item.id} />)
        ) : (
          <EmptyMessage> Your cart is empty </EmptyMessage>
        )}
      </CartItems>
      <Button onClick={() => navigate("/checkout")}>Check out</Button>
    </CartDropdownContainer>
  );
}

export default CartDropdown;
