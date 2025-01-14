import "./cart-dropdown.styles.jsx";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { useNavigate } from "react-router-dom";
import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles.jsx";

function CartDropdown() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
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
