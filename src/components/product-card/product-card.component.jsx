import { useContext } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { CartContext } from "../../contexts/cart.context";
import { ProductCardContainer, Footer } from "./product-card.styles";
function ProductCard({ product }) {
  const { addItemToCart } = useContext(CartContext);

  function addCartItem() {
    addItemToCart(product);
  }
  const { imageUrl, name, price } = product;
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
