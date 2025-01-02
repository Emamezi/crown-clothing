import { Outlet, Link, NavLink } from "react-router-dom";
import { ReactComponent as CrownSvg } from "../../assets/crown.svg";
import "./navigation.styles.scss";
import { useContext } from "react";
import { userContext } from "../../contexts/user.context";
import { signOutAuthUser } from "../../utils/firebase/firebase";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";
function Navigation() {
  const { currentUser, setCurrentUser } = useContext(userContext);
  const { isCartOpen } = useContext(CartContext);

  async function signOutHandler() {
    await signOutAuthUser();
    setCurrentUser(null);
  }

  return (
    <>
      <div className="navigation">
        <NavLink className="logo-container" to="/">
          <CrownSvg />
        </NavLink>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
}

export default Navigation;
