import { useContext } from "react";
import Button from "../button/button.component";
import "./product-card.styles.scss";
import { CartContext } from "../../contexts/cart.context";
function ProductCard({ product }) {
  const { addItemToCart } = useContext(CartContext);

  function addCartItem() {
    addItemToCart(product);
  }
  console.log(product);
  const { imageUrl, name, price } = product;
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt="" />
      <Button buttonType="inverted" onClick={addCartItem}>
        Add to Cart
      </Button>
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
    </div>
  );
}

export default ProductCard;
