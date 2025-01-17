import { Outlet, NavLink } from "react-router-dom";
import { ReactComponent as CrownSvg } from "../../assets/crown.svg";
import { signOutAuthUser, auth } from "../../utils/firebase/firebase";
import { useContext } from "react";
import { userContext } from "../../contexts/user.context";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";
import "./navigation.styles.jsx";
import {
  LogoContainer,
  NavigationContainer,
  NavLinks,
} from "./navigation.styles.jsx";
function Navigation() {
  const { currentUser, name } = useContext(userContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownSvg />
        </LogoContainer>
        <NavLinks>
          <span>{currentUser && `Welcome, ${name}`} </span>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutAuthUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
}

export default Navigation;
