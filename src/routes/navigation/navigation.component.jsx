import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { signOutAuthUser } from "../../utils/firebase/firebase";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";
import {
  LogoContainer,
  NavigationContainer,
  NavLinks,
} from "./navigation.styles.jsx";
import {
  selectCurrentUser,
  selectDisplayName,
} from "../../store/user/user.selectors.js";
import { ReactComponent as CrownSvg } from "../../assets/crown.svg";

function Navigation() {
  const currentUser = useSelector(selectCurrentUser);
  const displayName = useSelector(selectDisplayName);

  const { isCartOpen } = useContext(CartContext);

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownSvg />
        </LogoContainer>
        <NavLinks>
          <span>{currentUser && `Welcome, ${displayName}`} </span>
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
