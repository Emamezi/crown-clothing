import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { ProductCardContainer, Footer } from "./product-card.styles";
import { addItemToCart } from "../../store/cart/cart.action";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";

function ProductCard({ product }) {
  const { imageUrl, name, price } = product;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  console.log(cartItems);

  function addCartItem() {
    dispatch(addItemToCart(cartItems, product));
  }
  return (
    <ProductCardContainer>
      <img src={imageUrl} alt="" />
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addCartItem}>
        Add to Cart
      </Button>
      <Footer>
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </Footer>
    </ProductCardContainer>
  );
}

export default ProductCard;
