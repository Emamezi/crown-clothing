import CheckOutItem from "../../components/checkout-item/checkout-item.component";

import {
  CheckOutContainer,
  CheckOutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartItemsTotal,
} from "../../store/cart/cart.selector";

function CheckOut() {
  const cartItems = useSelector(selectCartItems);
  const cartPriceTotal = useSelector(selectCartItemsTotal);
  return (
    <CheckOutContainer>
      <CheckOutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckOutHeader>
      {cartItems.map((cartItem) => (
        <CheckOutItem cartItem={cartItem} key={cartItem.id} />
      ))}
      <Total>Total: ${cartPriceTotal} CAD</Total>
    </CheckOutContainer>
  );
}

export default CheckOut;
