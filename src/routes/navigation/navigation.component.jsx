import { Outlet, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutAuthUser } from "../../utils/firebase/firebase";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
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
import { selectIsCartOpen } from "../../store/cart/cart.selector.js";
import { signOutStart } from "../../store/user/user.actions.js";

function Navigation() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const displayName = useSelector(selectDisplayName);
  const isCartOpen = useSelector(selectIsCartOpen);

  function handleSignOutUser() {
    dispatch(signOutStart());
  }

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
            <NavLink as="span" onClick={handleSignOutUser}>
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
