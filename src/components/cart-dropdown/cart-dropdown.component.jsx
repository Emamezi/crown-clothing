import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";

function CartDropdown() {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">Itens</div>
      <Button>Check out</Button>
    </div>
  );
}

export default CartDropdown;
