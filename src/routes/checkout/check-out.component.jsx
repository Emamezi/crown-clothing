import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckOutItem from "../../components/checkout-item/checkout-item.component";
import "./checkout.styles.scss";

function CheckOut() {
  const { cartItems, cartPriceTotal } = useContext(CartContext);
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckOutItem cartItem={cartItem} key={cartItem.id} />
      ))}
      <span className="total">Total: ${cartPriceTotal} CAD</span>
    </div>
  );
}

export default CheckOut;
