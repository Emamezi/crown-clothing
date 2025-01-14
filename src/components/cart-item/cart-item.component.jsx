import "./cart-item.styles.jsx";
import { CartItemContainer, ItemDetails } from "./cart-item.styles.jsx";

function CartItem({ cartItem }) {
  const { name, quantity, imageUrl, price } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name} />
      <ItemDetails>
        <h2 className="name">{name}</h2>
        <span>
          {quantity} x {price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
}
export default CartItem;
